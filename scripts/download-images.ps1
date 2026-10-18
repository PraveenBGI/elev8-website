# Downloads every photo and flag the site uses into public/images.
# The list comes from src/content/images.ts, so this script never needs editing.
#
# Run from the project root:
#   powershell -ExecutionPolicy Bypass -File .\scripts\download-images.ps1
#
# Existing files are skipped, so your own replacement images are never overwritten.
# Add -Force to re-download everything.

param([switch]$Force)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$registry = Join-Path $root "src\content\images.ts"
$photoDir = Join-Path $root "public\images"
$flagDir = Join-Path $photoDir "flags"
New-Item -ItemType Directory -Force -Path $photoDir, $flagDir | Out-Null

$text = Get-Content -Raw -Path $registry
$photos = [regex]::Matches($text, '"([a-z0-9-]+)":\s*\{\s*source:\s*"(photo-[A-Za-z0-9-]+)"')
$flagBlock = [regex]::Match($text, 'FLAGS = \[([^\]]+)\]').Groups[1].Value
$flags = [regex]::Matches($flagBlock, '"([a-z]{2})"') | ForEach-Object { $_.Groups[1].Value }

$ok = 0; $skipped = 0; $failed = @()

foreach ($m in $photos) {
  $name = $m.Groups[1].Value
  $id = $m.Groups[2].Value
  $out = Join-Path $photoDir "$name.jpg"
  if ((Test-Path $out) -and -not $Force) { $skipped++; continue }
  $url = "https://images.unsplash.com/$id`?auto=format&fit=crop&w=1600&q=80&fm=jpg"
  try { Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing; $ok++; Write-Host "OK   $name.jpg" }
  catch { $failed += "$name.jpg"; Write-Warning "FAIL $name.jpg" }
}

foreach ($f in $flags) {
  $out = Join-Path $flagDir "$f.png"
  if ((Test-Path $out) -and -not $Force) { $skipped++; continue }
  try { Invoke-WebRequest -Uri "https://flagcdn.com/w80/$f.png" -OutFile $out -UseBasicParsing; $ok++; Write-Host "OK   flags/$f.png" }
  catch { $failed += "flags/$f.png"; Write-Warning "FAIL flags/$f.png" }
}

Write-Host ""
Write-Host "Downloaded: $ok   Already there: $skipped   Photos listed: $($photos.Count)   Flags listed: $($flags.Count)"
if ($failed.Count -gt 0) { Write-Warning "Failed: $($failed -join ', '). Run the script again." }
