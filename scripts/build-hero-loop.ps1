<#
.SYNOPSIS
  Builds the seamless hero loop and its poster frame from a source promo film.

.DESCRIPTION
  The source films in public/assets are complete ten-second promos: a logo
  title card, then live footage, then a logo end card. Played on a loop in the
  hero, a logo card appears every ten seconds — which reads as an advert on
  repeat rather than as ambient product footage.

  This cuts the live footage out from between the two cards, then cross-fades
  the clip's tail back onto its head so the loop point is invisible. The result
  is roughly a third of the original file size with no title cards in it.

  The source films are never modified.

.NOTES
  Requires ffmpeg on PATH. Re-run after changing the source or the cut points.
  Verify new cut points by exporting frames first:
      ffmpeg -ss 3.3 -i <source> -frames:v 1 frame.jpg
#>

[CmdletBinding()]
param(
    [string] $Root,
    [string] $Source = "ai_office_indiamp_.mp4",
    # Boundaries of the live footage: after the intro sting has fully cleared
    # (it still ghosts at 2.6s) and before the end card starts fading in (by
    # 7.5s). This window also opens on the strongest shot in the film — the
    # mentor mid-gesture, front and centre — rather than on a distant wide.
    [double] $Start = 2.8,
    [double] $End = 7.4,
    # Length of the loop-point cross-fade. Long enough to hide the seam, short
    # enough not to eat much of a short clip.
    [double] $Blend = 0.6
)

if (-not $Root) {
    $Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
}

$ffmpeg = (Get-Command ffmpeg -ErrorAction SilentlyContinue).Source
if (-not $ffmpeg) { throw "ffmpeg is not on PATH." }

$assets = Join-Path $Root "public\assets"
$sourcePath = Join-Path $assets $Source
if (-not (Test-Path $sourcePath)) { throw "Source not found: $sourcePath" }

$cut = Join-Path ([IO.Path]::GetTempPath()) "syasans-hero-cut.mp4"
$loop = Join-Path $assets "hero-loop.mp4"
$poster = Join-Path $assets "hero-poster.jpg"

# 1. Isolate the live footage. Near-lossless here; the second pass does the
#    real compression, so this stage must not introduce artefacts to bake in.
& $ffmpeg -v error -y -ss $Start -to $End -i $sourcePath `
    -an -c:v libx264 -crf 18 -preset medium -pix_fmt yuv420p $cut

# 2. Cross-fade the tail onto the head.
#    body = clip minus its first $Blend seconds; head = that first $Blend.
#    Blending head over the end of body makes the last frame identical to the
#    first, so playback wraps with no visible cut.
$bodyLength = ($End - $Start) - $Blend
$offset = $bodyLength - $Blend

& $ffmpeg -v error -y -i $cut -filter_complex `
    "[0:v]trim=0:$Blend,setpts=PTS-STARTPTS[head];[0:v]trim=$Blend,setpts=PTS-STARTPTS[body];[body][head]xfade=transition=fade:duration=$Blend`:offset=$offset[v]" `
    -map "[v]" -an -c:v libx264 -crf 23 -preset slow -profile:v high -pix_fmt yuv420p `
    -movflags +faststart $loop

# 3. Poster from the loop's own first frame, so the still and the first frame
#    of playback are the same image and there is no jump when it starts.
& $ffmpeg -v error -y -i $loop -frames:v 1 -q:v 4 $poster

Remove-Item $cut -Force -ErrorAction SilentlyContinue

foreach ($file in @($loop, $poster)) {
    "{0,-22} {1,6:N0} KB" -f (Split-Path $file -Leaf), ((Get-Item $file).Length / 1KB)
}
