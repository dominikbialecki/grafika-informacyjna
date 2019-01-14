export const navbarData: NavbarData[] = [
    {
        nameKeyScope: 'POLAND',
        redirectUrl: 'poland',
        children: [
            { nameKeyScope: "MASOVIA", redirectUrl: 'masovia', children: [] },
            { nameKeyScope: "LOWER_SILESIA", redirectUrl: 'lower-silesia', children: [] },
            {
                nameKeyScope: "GREATER_POLAND", redirectUrl: 'greater-poland', children: [
                    { nameKeyScope: "POZNAŃ", redirectUrl: "poznań", children: [] },
                    { nameKeyScope: "KALISZ", redirectUrl: "kalisz", children: [] },
                    { nameKeyScope: "LESZNO", redirectUrl: "leszno", children: [] },
                    { nameKeyScope: "KONIN", redirectUrl: "konin", children: [] },
                    { nameKeyScope: "POZNAŃ_COUNTY", redirectUrl: "poznań-county", children: [] },
                    {
                        nameKeyScope: "OSTRÓW_WIELKOPOLSKI_COUNTY",
                        redirectUrl: "ostrów-wielkopolski-county",
                        children: []
                    },
                    { nameKeyScope: "GNIEZNO_COUNTY", redirectUrl: "gniezno-county", children: [] },
                    { nameKeyScope: "PIŁA_COUNTY", redirectUrl: "piła-county", children: [] },
                    { nameKeyScope: "KONIN_COUNTY", redirectUrl: "konin-county", children: [] },
                    { nameKeyScope: "KOŁO_COUNTY", redirectUrl: "koło-county", children: [] },
                    {
                        nameKeyScope: "CZARNKÓW_TRZCIANKA_COUNTY",
                        redirectUrl: "czarnków-trzcianka-county",
                        children: []
                    },
                    { nameKeyScope: "SZAMOTUŁY_COUNTY", redirectUrl: "szamotuły-county", children: [] },
                    { nameKeyScope: "TUREK_COUNTY", redirectUrl: "turek-county", children: [] },
                    { nameKeyScope: "KALISZ_COUNTY", redirectUrl: "kalisz-county", children: [] },
                    { nameKeyScope: "KOŚCIAN_COUNTY", redirectUrl: "kościan-county", children: [] },
                    { nameKeyScope: "KROTOSZYN_COUNTY", redirectUrl: "krotoszyn-county", children: [] },
                    { nameKeyScope: "GOSTYŃ_COUNTY", redirectUrl: "gostyń-county", children: [] },
                    { nameKeyScope: "WRZEŚNIA_COUNTY", redirectUrl: "września-county", children: [] },
                    { nameKeyScope: "NOWY_TOMYŚL_COUNTY", redirectUrl: "nowy-tomyśl-county", children: [] },
                    { nameKeyScope: "JAROCIN_COUNTY", redirectUrl: "jarocin-county", children: [] },
                    { nameKeyScope: "ZŁOTÓW_COUNTY", redirectUrl: "złotów-county", children: [] },
                    { nameKeyScope: "WĄGROWIEC_COUNTY", redirectUrl: "wągrowiec-county", children: [] },
                    { nameKeyScope: "PLESZEW_COUNTY", redirectUrl: "pleszew-county", children: [] },
                    { nameKeyScope: "RAWICZ_COUNTY", redirectUrl: "rawicz-county", children: [] },
                    { nameKeyScope: "SŁUPCA_COUNTY", redirectUrl: "słupca-county", children: [] },
                    { nameKeyScope: "ŚREM_COUNTY", redirectUrl: "śrem-county", children: [] },
                    { nameKeyScope: "OBORNIKI_COUNTY", redirectUrl: "oborniki-county", children: [] },
                    { nameKeyScope: "KĘPNO_COUNTY", redirectUrl: "kępno-county", children: [] },
                    { nameKeyScope: "WOLSZTYN_COUNTY", redirectUrl: "wolsztyn-county", children: [] },
                    {
                        nameKeyScope: "ŚRODA_WIELKOPOLSKA_COUNTY",
                        redirectUrl: "środa-wielkopolska-county",
                        children: []
                    },
                    { nameKeyScope: "OSTRZESZÓW_COUNTY", redirectUrl: "ostrzeszów-county", children: [] },
                    { nameKeyScope: "LESZNO_COUNTY", redirectUrl: "leszno-county", children: [] },
                    {
                        nameKeyScope: "GRODZISK_WIELKOPOLSKI_COUNTY",
                        redirectUrl: "grodzisk-wielkopolski-county",
                        children: []
                    },
                    { nameKeyScope: "CHODZIEŻ_COUNTY", redirectUrl: "chodzież-county", children: [] },
                    { nameKeyScope: "MIĘDZYCHÓD_COUNTY", redirectUrl: "międzychód-county", children: [] },
                ]
            },
            { nameKeyScope: "SILESIA", redirectUrl: 'silesia', children: [] },
            { nameKeyScope: "POMERANIA", redirectUrl: 'pomerania', children: [] },
            { nameKeyScope: "ŁÓDŹ", redirectUrl: 'łódź', children: [] },
            { nameKeyScope: "LESSER_POLAND", redirectUrl: 'lesser-poland', children: [] },
            { nameKeyScope: "WEST_POMERANIA", redirectUrl: 'west-pomerania', children: [] },
            { nameKeyScope: "LUBUSZ", redirectUrl: 'lubusz', children: [] },
            { nameKeyScope: "KUJAWY_POMERANIA", redirectUrl: 'kujawy-pomerania', children: [] },
            { nameKeyScope: "OPOLE", redirectUrl: 'opole', children: [] },
            { nameKeyScope: "ŚWIĘTOKRZYSKIE", redirectUrl: 'świętokrzyskie', children: [] },
            { nameKeyScope: "WARMIA_MASURIA", redirectUrl: 'warmia-masuria', children: [] },
            { nameKeyScope: "PODLASKIE", redirectUrl: 'podlaskie', children: [] },
            { nameKeyScope: "PODKARPACKIE", redirectUrl: 'podkarpackie', children: [] },
        ],
    }
];

export function getUrlNameKeysMap() {
    const urlNameKeyArr = [];
    navbarData.forEach(country => {
        urlNameKeyArr.push([country.redirectUrl, [country.nameKeyScope]]);
        if (country.children) {
            country.children.forEach(voivodeship => {
                urlNameKeyArr.push([
                    [country.redirectUrl, voivodeship.redirectUrl].join('/'),
                    [country.nameKeyScope, voivodeship.nameKeyScope],
                ]);
                if (voivodeship.children) {
                    voivodeship.children.forEach(county => {
                        urlNameKeyArr.push([
                            [country.redirectUrl, voivodeship.redirectUrl, county.redirectUrl].join('/'),
                            [country.nameKeyScope, voivodeship.nameKeyScope, county.nameKeyScope],
                        ])
                    });
                }
            })
        }
    });
    return new Map(urlNameKeyArr);
}

export interface NavbarData {
    nameKeyScope: string;
    redirectUrl: string;
    children: NavbarData[];
    expanded?: boolean;
}



























