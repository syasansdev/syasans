<#
.SYNOPSIS
  Re-encodes photographic PNG assets as JPEG.

.DESCRIPTION
  Thirteen photographs were stored as 1024px PNGs at roughly 1.3 MB each.
  PNG is lossless and therefore a poor fit for photography: the same images
  at JPEG quality 82 are around a tenth of the size with no visible
  difference at the sizes they are displayed.

  Only files on the explicit list below are touched. Logos, marks with
  transparency, and the learning-centres map (which contains text, where JPEG
  ringing would be obvious) deliberately stay PNG.

  The source PNG is deleted after a successful write, so the code references
  updated alongside this script are the only valid ones.
  Recoverable with `git checkout -- public/assets`.
#>

[CmdletBinding()]
param(
    [string] $Root,
    [int] $Quality = 82
)

Add-Type -AssemblyName System.Drawing

if (-not $Root) {
    $Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
}

$photographs = @(
    "Classroom_setting.png",
    "mentorship.png",
    "certifications_support.png",
    "career_analytics.png",
    "Job_offer.png",
    "Interview_setting.png",
    "Dashboard.png",
    "mobile.png",
    "Assesment.png",
    "Demographic.png",
    "Recognition.png",
    "Sathanai_selvangal.png",
    "state_level_endorsement.png",
    "Placement_rate.png"
)

$assetDir = Join-Path $Root "public\assets"
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq 'image/jpeg' }

$savedBytes = 0
$converted = 0

foreach ($name in $photographs) {
    $sourcePath = Join-Path $assetDir $name
    if (-not (Test-Path $sourcePath)) {
        Write-Warning "missing $name"
        continue
    }

    $targetPath = [IO.Path]::ChangeExtension($sourcePath, ".jpg")
    $originalSize = (Get-Item $sourcePath).Length

    $source = [System.Drawing.Image]::FromFile($sourcePath)
    try {
        # Flatten onto white: JPEG has no alpha channel, and compositing
        # explicitly avoids the black fringing you get from an undefined
        # background.
        $canvas = New-Object System.Drawing.Bitmap($source.Width, $source.Height, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
        $graphics = [System.Drawing.Graphics]::FromImage($canvas)
        try {
            $graphics.Clear([System.Drawing.Color]::White)
            $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
            $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.DrawImage($source, 0, 0, $source.Width, $source.Height)
        } finally {
            $graphics.Dispose()
        }

        $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
            [System.Drawing.Imaging.Encoder]::Quality, $Quality)
        $canvas.Save($targetPath, $encoder, $params)
        $params.Dispose()
        $canvas.Dispose()
    } finally {
        $source.Dispose()
    }

    $newSize = (Get-Item $targetPath).Length
    Remove-Item $sourcePath -Force

    Write-Host ("{0,-32} {1,7:N0} KB -> {2,6:N0} KB" -f $name, ($originalSize / 1KB), ($newSize / 1KB))

    $savedBytes += ($originalSize - $newSize)
    $converted++
}

Write-Host ""
Write-Host ("Converted {0} file(s); saved {1:N1} MB." -f $converted, ($savedBytes / 1MB))
