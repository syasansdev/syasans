<#
.SYNOPSIS
  Downscales oversized raster assets in place.

.DESCRIPTION
  The asset directory shipped images at their original capture resolution:
  a 3840x2503 PNG was being rendered as a 40px-tall logo tile, and the
  1024x1024 wordmark was a 430 KB PNG served on every page.

  This resizes each file to the largest size it is actually displayed at
  (x2 for high-density screens) while preserving the filename and the format,
  so no markup changes and nothing can 404. Images already at or below their
  cap are skipped.

  Everything here is recoverable with `git checkout -- public/assets`.

.NOTES
  Uses System.Drawing (present on Windows) so the repo needs no image
  toolchain. Re-run safely: it is idempotent.
#>

[CmdletBinding()]
param(
    [string] $Root,
    [switch] $WhatIfOnly
)

Add-Type -AssemblyName System.Drawing

# Default to the repository root (this script lives in ./scripts). Resolved
# here rather than in the param block, which does not see $PSScriptRoot on
# Windows PowerShell 5.1.
if (-not $Root) {
    $Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
}

# Rendered at 40-48px in the header and 180px as an apple-touch icon.
$brandMarks = @("syasans-logo.png", "Logo.png")

# Logo walls, accreditation marks and partner crests: never wider than ~220px.
$logoMarks = @(
    "Sathyabama.png", "srm.png", "Crescent_college.png", "Sairam.png", "kalasalingam.png",
    "vels.png", "mgr.png", "mepco.png", "vellamal.png", "jeppiarcollege.png", "jeppiar.png",
    "amity.png", "Dhanalakshmi.png", "StJosephscollege.png",
    "zoho.png", "cognizant.png", "Deloitte.png", "cisco.png", "tata.png", "ey.png",
    "ltimindtree.png", "thoughtworks.png", "mahindra.png", "valeo.png", "presidio.png",
    "avasoft.png", "mrcooper.png", "hashedin.png", "Blackstraw.png",
    "iso_cert.png", "msme.png", "tamilnadu-logo.png", "IOE.png", "Nsdc.png",
    "Government-Of-Tamil-Nadu-Logo-Vector.svg--1397x1536.png"
)

function Get-MaxWidth([string] $name) {
    if ($brandMarks -contains $name) { return 256 }
    if ($logoMarks  -contains $name) { return 512 }
    # Cover images, screenshots and photography: full-width at 2x on a
    # laptop-class viewport is comfortably served by 1600px.
    return 1600
}

$targets = Get-ChildItem -Path (Join-Path $Root "public\assets") -Include *.png, *.jpg, *.jpeg -File -Recurse
$savedBytes = 0
$processed = 0

foreach ($file in $targets) {
    $maxWidth = Get-MaxWidth $file.Name

    $source = [System.Drawing.Image]::FromFile($file.FullName)
    try {
        if ($source.Width -le $maxWidth) {
            Write-Verbose "skip  $($file.Name) ($($source.Width)px)"
            continue
        }

        $scale = $maxWidth / $source.Width
        $newWidth = [int]$maxWidth
        $newHeight = [Math]::Max(1, [int][Math]::Round($source.Height * $scale))
        $originalSize = $file.Length

        Write-Host ("resize {0,-46} {1}x{2} -> {3}x{4}" -f `
            $file.Name, $source.Width, $source.Height, $newWidth, $newHeight)

        if ($WhatIfOnly) { continue }

        # 32bpp ARGB throughout: PNG logos frequently carry transparency, and
        # flattening it onto white would ruin them on the dark theme.
        $canvas = New-Object System.Drawing.Bitmap($newWidth, $newHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
        $graphics = [System.Drawing.Graphics]::FromImage($canvas)
        try {
            $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
            $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
            $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
            $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
            $graphics.DrawImage($source, 0, 0, $newWidth, $newHeight)
        } finally {
            $graphics.Dispose()
        }

        $isJpeg = $file.Extension -match '^\.jpe?g$'
        $tempPath = "$($file.FullName).tmp"

        if ($isJpeg) {
            $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
                Where-Object { $_.MimeType -eq 'image/jpeg' }
            $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
                [System.Drawing.Imaging.Encoder]::Quality, 82)
            $canvas.Save($tempPath, $encoder, $params)
            $params.Dispose()
        } else {
            $canvas.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
        }

        $canvas.Dispose()
        $source.Dispose()

        Move-Item -Path $tempPath -Destination $file.FullName -Force

        $savedBytes += ($originalSize - (Get-Item $file.FullName).Length)
        $processed++
    } finally {
        $source.Dispose()
    }
}

Write-Host ""
Write-Host ("Resized {0} file(s); saved {1:N1} MB." -f $processed, ($savedBytes / 1MB))
