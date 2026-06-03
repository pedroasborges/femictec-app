$ErrorActionPreference = 'Stop'

$changes = @(
  @{ Path = 'C:\Desenvolvimento\femictec\src\api\navbar\content-types\navbar\schema.json'; Pattern = '(?m)"displayName"\s*:\s*"Navbar"'; Replacement = '"displayName": "Global - Navbar"' },
  @{ Path = 'C:\Desenvolvimento\femictec\src\api\footer\content-types\footer\schema.json'; Pattern = '(?m)"displayName"\s*:\s*"Footer"'; Replacement = '"displayName": "Global - Footer"' },
  @{ Path = 'C:\Desenvolvimento\femictec\src\api\femictec\content-types\femictec\schema.json'; Pattern = '(?m)"displayName"\s*:\s*"Femictec"'; Replacement = '"displayName": "Página - FEMICTEC"' },
  @{ Path = 'C:\Desenvolvimento\femictec\types\generated\contentTypes.d.ts'; Pattern = "(?m)displayName:\s*'Navbar';"; Replacement = "displayName: 'Global - Navbar';" },
  @{ Path = 'C:\Desenvolvimento\femictec\types\generated\contentTypes.d.ts'; Pattern = "(?m)displayName:\s*'Footer';"; Replacement = "displayName: 'Global - Footer';" },
  @{ Path = 'C:\Desenvolvimento\femictec\types\generated\contentTypes.d.ts'; Pattern = "(?m)displayName:\s*'Femictec';"; Replacement = "displayName: 'Página - FEMICTEC';" },
  @{ Path = 'C:\Desenvolvimento\femictec\README.md'; Pattern = '(?m)^- `Footer` - single type - endpoint `/api/footer`$'; Replacement = '- `Global - Footer` - single type - endpoint `/api/footer`' },
  @{ Path = 'C:\Desenvolvimento\femictec\README.md'; Pattern = '(?m)^- `Banner` - collection type - endpoint `/api/banners`$'; Replacement = '- `Home - Banner` - collection type - endpoint `/api/banners`' },
  @{ Path = 'C:\Desenvolvimento\femictec\README.md'; Pattern = '(?m)^- `Datas da Home` - single type - endpoint `/api/home-data`$'; Replacement = '- `Home - Datas` - single type - endpoint `/api/home-data`' },
  @{ Path = 'C:\Desenvolvimento\femictec\README.md'; Pattern = '(?m)^- `Dado Institucional` - single type - endpoint `/api/dado-institucional`$'; Replacement = '- `Home - Dado Institucional` - single type - endpoint `/api/dado-institucional`' },
  @{ Path = 'C:\Desenvolvimento\femictec\README.md'; Pattern = '(?m)^- `Femictec` - single type - endpoint `/api/femictec`$'; Replacement = '- `Página - FEMICTEC` - single type - endpoint `/api/femictec`' },
  @{ Path = 'C:\Desenvolvimento\femictec\docs\USABILIDADE-STRAPI.md'; Pattern = '(?m)^- `Banner`$'; Replacement = '- `Home - Banner`' },
  @{ Path = 'C:\Desenvolvimento\femictec\docs\USABILIDADE-STRAPI.md'; Pattern = '(?m)^- `Footer`$'; Replacement = '- `Global - Footer`' },
  @{ Path = 'C:\Desenvolvimento\femictec\docs\USABILIDADE-STRAPI.md'; Pattern = '(?m)^- `Dado Institucional`$'; Replacement = '- `Home - Dado Institucional`' },
  @{ Path = 'C:\Desenvolvimento\femictec\docs\USABILIDADE-STRAPI.md'; Pattern = '(?m)^- `Datas da Home`$'; Replacement = '- `Home - Datas`' },
  @{ Path = 'C:\Desenvolvimento\femictec\docs\USABILIDADE-STRAPI.md'; Pattern = '(?m)^- `Femictec`$'; Replacement = '- `Página - FEMICTEC`' }
)

foreach ($change in $changes) {
  $content = Get-Content -Raw -LiteralPath $change.Path
  $updated = [regex]::Replace($content, $change.Pattern, $change.Replacement)
  if ($updated -eq $content) {
    throw "Nao encontrei o texto esperado em $($change.Path): $($change.Pattern)"
  }
  Set-Content -LiteralPath $change.Path -Value $updated
}
