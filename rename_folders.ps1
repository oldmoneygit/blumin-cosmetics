Get-ChildItem "KAHI" -Directory | Where-Object {$_.Name.Length -gt 40} | ForEach-Object {
    $counter = Get-Random -Minimum 1000 -Maximum 9999
    $newName = "KAHI-Product-" + $counter
    Write-Host "Renaming: $($_.Name) -> $newName"
    Rename-Item -Path $_.FullName -NewName $newName -ErrorAction Stop
}
