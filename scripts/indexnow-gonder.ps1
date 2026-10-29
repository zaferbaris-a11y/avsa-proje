# Sitemap'teki tüm adresleri Bing ve diğer IndexNow arama motorlarına bildirir.
# Kullanım (proje klasöründe PowerShell): powershell -ExecutionPolicy Bypass -File scripts/indexnow-gonder.ps1
$key = "9fb9b0b1b32bb3df70e49c7a5664f962"
$site = "https://www.avsaadasi.net"
[xml]$sm = (Invoke-WebRequest -UseBasicParsing "$site/sitemap.xml").Content
$urls = @($sm.urlset.url.loc)
Write-Host "Gönderilecek adres sayısı: $($urls.Count)"
$body = @{ host = "www.avsaadasi.net"; key = $key; keyLocation = "$site/$key.txt"; urlList = $urls } | ConvertTo-Json
$r = Invoke-WebRequest -UseBasicParsing -Method Post -Uri "https://api.indexnow.org/indexnow" -ContentType "application/json; charset=utf-8" -Body $body
Write-Host "Sonuç: $($r.StatusCode) (200 veya 202 = kabul edildi)"
