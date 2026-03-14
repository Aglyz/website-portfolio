function ImageProcessor({ project }) {

    const chart_options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return 'Intensité ' + context.label + ': ' + context.parsed.y + ' pixels';
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return value > 1000 ? (value / 1000).toFixed(1) + 'k' : value;
                    }
                },
                title: {
                    display: false,
                    text: 'Nombre de pixels'
                }
            },
            x: {
                title: {
                    display: false,
                    text: 'Niveau de gris (0-255)'
                },
                ticks: {
                    maxTicksLimit: 20
                }
            }
        }
    };

    const create_chart = (selector, config) => {
        const canvases = document.querySelectorAll(selector);

        canvases.forEach(canvas => {
            new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: config.labels,
                    datasets: [{
                        data: config.data,
                        backgroundColor: 'rgba(112, 8, 231, 0.55)',
                        borderColor: 'rgba(112, 8, 231, 0.85)',
                        borderWidth: 0,
                        categoryPercentage: 1.0,
                        barPercentage: 1.0
                    }]
                },
                options: chart_options
            });
        });
    };

    React.useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

        const histogram_config = {
            labels : Array.from({length: 256}, (_, i) => i),
            data : [
                3311, 7193, 9052, 10619, 11054, 11000, 11918, 12582, 14133, 16182, 19069, 23254, 28747, 35595, 43211, 50322, 
                58525, 67674, 73924, 78566, 83650, 88619, 95488, 102521, 109509, 115280, 119817, 124511, 128213, 131435, 135335, 137097, 
                136952, 136495, 135778, 134052, 132592, 130672, 126319, 124440, 121617, 119330, 116051, 112287, 109527, 106920, 103745, 100671, 
                98008, 95623, 92704, 89430, 86367, 84064, 81451, 79750, 77359, 75078, 73423, 71562, 69873, 68080, 67342, 65600, 
                63054, 61668, 60066, 58614, 56557, 55297, 53651, 52396, 51052, 49893, 48830, 47774, 47089, 46388, 45425, 44965, 
                44343, 43642, 43449, 42917, 42162, 41708, 41034, 40886, 40641, 40112, 39436, 39342, 39057, 38728, 38700, 38283, 
                37950, 38137, 37797, 37751, 37283, 37309, 37152, 37220, 37014, 37730, 37553, 38048, 37775, 37401, 37259, 37929, 
                38144, 38116, 38010, 38725, 39045, 39565, 39617, 40025, 40621, 41020, 41478, 41342, 41623, 41839, 42395, 42861, 
                43844, 44369, 44965, 45860, 46543, 47846, 48516, 49860, 51161, 53257, 55028, 58176, 61107, 64619, 69152, 73059, 
                79429, 84275, 90578, 96676, 104375, 111344, 121079, 131467, 144458, 158812, 172808, 186403, 199624, 210981, 218741, 223712, 
                223779, 221038, 216156, 211028, 205256, 196106, 179269, 157506, 131697, 106465, 82293, 63706, 52720, 46403, 43362, 42022, 
                41075, 40792, 40693, 40219, 40124, 39705, 38834, 39012, 38363, 38243, 38003, 37609, 36955, 36781, 35953, 35502, 
                34833, 34298, 33832, 33110, 32526, 32014, 32596, 36051, 49878, 63057, 96389, 108952, 128775, 132905, 126008, 108157, 
                100775, 82690, 79419, 68273, 58517, 50715, 42619, 36841, 31995, 27573, 23648, 21285, 19716, 18428, 17049, 16422, 
                15668, 15018, 14270, 13221, 12846, 11716, 11359, 10980, 10314, 9919, 9624, 9211, 8564, 8246, 7812, 7633, 
                6924, 6622, 6599, 5854, 5222, 5062, 4563, 3691, 3410, 2590, 2318, 2077, 1130, 900, 283, 2
            ],
        };

        const histogram_low_lum_config = {
            labels : Array.from({length: 256}, (_, i) => i),
            data : [
                311071, 20494, 22914, 25133, 32192, 45706, 69294, 99323, 132101, 155901, 175660, 202334, 228101, 247345, 260776, 272973,
                273455, 268843, 261249, 249459, 239262, 225808, 214544, 202577, 192154, 180634, 168764, 159773, 151400, 144051, 136456, 131470,
                123496, 117662, 111115, 105115, 100336, 96112, 92786, 90187, 87605, 85830, 83521, 81955, 80111, 78795, 77608, 76558,
                76236, 75298, 74650, 74244, 75014, 75566, 74992, 75477, 76147, 77105, 78800, 79964, 81946, 82738, 83874, 85525,
                88491, 91532, 95111, 99239, 105610, 115334, 127886, 144817, 165496, 189246, 218163, 257610, 310381, 366862, 419131, 447309,
                445631, 427659, 396648, 324929, 217193, 136779, 95151, 84237, 81858, 80529, 79658, 77535, 76512, 75323, 73299, 71040,
                68861, 66579, 64685, 73705, 141621, 216163, 267967, 218304, 177639, 134936, 100630, 73655, 56066, 43001, 37229, 33068,
                30114, 27098, 24027, 22110, 20160, 18458, 16538, 15014, 13445, 11984, 9748, 7836, 5465, 3660, 1606, 92,
                ...Array(176).fill(0)
            ],
        };

        const histogram_high_lum_config = {
            labels : Array.from({length: 256}, (_, i) => i),
            data : [
                1565, 4765, 4739, 6217, 6847, 7420, 7445, 7445, 7986, 7687, 8509, 8728, 9446, 10698, 11767, 12248,
                15822, 16929, 18207, 25204, 24451, 27770, 35571, 34450, 37433, 47434, 45901, 46730, 55612, 52792, 52521, 61965,
                60109, 60532, 70974, 69410, 69110, 79649, 78101, 75949, 85749, 83936, 83171, 89371, 87848, 89249, 93793, 89745,
                91297, 92752, 89452, 90564, 90973, 87592, 89086, 87903, 85088, 84649, 83122, 82103, 81559, 79904, 78643, 77644,
                75737, 73004, 73308, 71751, 70109, 69658, 67790, 65489, 66186, 63804, 62926, 62356, 59744, 58911, 57407, 56330,
                55603, 54203, 53138, 52877, 51415, 50233, 49973, 48602, 47374, 48115, 46213, 45289, 45474, 44626, 43644, 43639,
                41886, 41115, 40775, 40252, 39055, 38696, 37866, 36646, 36608, 35782, 34625, 34929, 34042, 33159, 33312, 32533,
                31646, 32128, 31281, 30575, 31075, 30245, 29524, 30475, 29422, 28594, 29670, 28982, 28283, 28684, 28126, 27367,
                28159, 27391, 26731, 27788, 26989, 26375, 26855, 26351, 25858, 26646, 26018, 25496, 26143, 25831, 25254, 25483,
                25502, 25230, 25563, 25254, 24728, 25402, 24937, 24503, 25166, 24890, 24592, 24870, 24760, 24938, 25181, 25252,
                25014, 25435, 25489, 24945, 24685, 25095, 24999, 25405, 25800, 25419, 25112, 25764, 25769, 25680, 26395, 26328,
                26310, 26830, 26840, 26623, 27535, 27321, 27613, 28310, 27706, 27499, 28550, 28460, 28152, 29163, 28872, 29543,
                30548, 30223, 30632, 31823, 32324, 32278, 33803, 34173, 35534, 35569, 37888, 38089, 39330, 40899, 43957, 41479,
                48927, 48098, 53483, 54967, 68633, 64336, 87430, 79128, 110295, 96214, 134607, 119284, 163745, 153907, 209375, 187462,
                236157, 209988, 274791, 273810, 319298, 293322, 305937, 296144, 268791, 208723, 155046, 146960, 166330, 216246, 250930, 235500,
                182795, 132408, 104455, 89177, 79607, 73321, 69201, 66008, 62809, 59887, 57492, 55038, 53014, 50259, 47473, 695477
            ],
        };

        create_chart('.histogram-chart', histogram_config);

        create_chart('.histogram-chart-low-lum', histogram_low_lum_config);

        create_chart('.histogram-chart-high-lum', histogram_high_lum_config);
    }, []);

    const project_asset_url = img_url + `projects/image-processor/`;

    const project_ppm_url = project_asset_url + `ppm/`;
    const project_jpg_url = project_asset_url + `jpg/`;
    const project_img_url = img_url + `background-landscape-wide.jpg`;

    return (
        <main id="content" className="container my-5">
            {console.log(project.git)}
            <HeaderActions git={project.git} exe={`exe/main.exe`} />

            <section>
                <h2 className="lexend fw--normal mt-5">Présentation</h2>
                <article>
                    <p className="lexend">
                        Un petit outil de traitement d'images en C++ qui charge/enregistre des <strong>.ppm</strong>,
                        crée des composantes couleur, histogrammes, conversions gris/noir-et-blanc,
                        transformations (rotation, zoom, crop), filtres et undo.
                    </p>
                    <p className="lexend">
                        Code source et exécutable disponibles sur <a className="link-main" href={project.github} target="_blank" rel="noopener noreferrer">GitHub — image-processor-cpp</a>. <br/>
                        Ou télécharger <a className="link-main" href="/assets/exe/main.exe" target="_blank" rel="noopener noreferrer">l'exécutable</a> en haut de page.
                    </p>
                    <p className="lexend">Le projet a été réalisé par Aelig Jimenez (IUT Orsay) et contient des exemples et un exécutable dans le dépôt.</p>
                </article>

                <h3 className="lexend fw--normal mt-4">Utilisation recommandée</h3>
                <article className="content-sm">
                    <p className="lexend">
                        Le dépôt <a className="link-main" href={project.github} target="_blank" rel="noopener"> GitHub — image-processor-cpp</a> contient également le code source complet,
                        des exemples d'images et des scénarios de test.
                    </p>
                    <p className="lexend">
                        Pour tester rapidement l'outil sans configuration C++, il suffit de télécharger
                        l'exécutable <a href="/assets/exe/main.exe" className="link-main"><i className="bi bi-filetype-exe me-2"></i>Exécutable</a> puis
                        de l'exécuter en local sur vos images <strong>.ppm</strong>.
                    </p>
                    <p className="lexend">
                        Vous ne disposez pas d'images ? Vous pouvez téléchargez l'image incluse dans ce bloc.
                    </p>
                    <ImageBox
                        title="Image"
                        imgSrc={project_img_url}
                        downloadSrc={project_ppm_url + `background-landscape-wide.ppm`}
                        downloadName="example.ppm"
                        classes="mt-1 mb-0"
                        height={256}
                    />
                </article>
                <article className="content-md row">
                    <div className="col-6">
                        <ImageBox
                            title="Image"
                            imgSrc={project_img_url}
                            downloadSrc={project_ppm_url + `background-landscape-wide.ppm`}
                            downloadName="example.ppm"
                            classes="mt-1 mb-0"
                            height={256}
                        />
                    </div>
                    <div className="col-6">
                        <p className="lexend">
                            Le dépôt <a className="link-main" href={project.github} target="_blank" rel="noopener"> GitHub — image-processor-cpp</a> contient également le code source complet,
                            des exemples d'images et des scénarios de test.
                        </p>
                        <p className="lexend">
                            Pour tester rapidement l'outil sans configuration C++, il suffit de télécharger
                            l'exécutable <a href="/assets/exe/main.exe" className="link-main"><i className="bi bi-filetype-exe me-2"></i>Exécutable</a> puis
                            de l'exécuter en local sur vos images <strong>.ppm</strong>.
                        </p>
                        <p className="lexend">
                            Vous ne disposez pas d'images ? Vous pouvez téléchargez l'image incluse dans ce bloc.
                        </p>
                    </div>
                </article>
                <article className="content-lg row">
                    <div className="col-4">
                        <ImageBox
                            title="Image"
                            imgSrc={project_img_url}
                            downloadSrc={project_ppm_url + `background-landscape-wide.ppm`}
                            downloadName="example.ppm"
                            classes="mt-1 mb-0"
                            height={256}
                        />
                    </div>
                    <div className="col-8">
                        <p className="lexend">
                            Le dépôt <a className="link-main" href={project.github} target="_blank" rel="noopener"> GitHub — image-processor-cpp</a> contient également le code source complet,
                            des exemples d'images et des scénarios de test.
                        </p>
                        <p className="lexend">
                            Pour tester rapidement l'outil sans configuration C++, il suffit de télécharger
                            l'exécutable <a href="/assets/exe/main.exe" className="link-main"><i className="bi bi-filetype-exe me-2"></i>Exécutable</a> puis
                            de l'exécuter en local sur vos images <strong>.ppm</strong>.
                        </p>
                        <p className="lexend">
                            Vous ne disposez pas d'images ? Vous pouvez téléchargez l'image incluse dans ce bloc.
                        </p>
                    </div>
                </article>
                <article className="content-xl row">
                    <div className="col-4">
                        <ImageBox
                            title="Image"
                            imgSrc={project_img_url}
                            downloadSrc={project_ppm_url + `background-landscape-wide.ppm`}
                            downloadName="example.ppm"
                            classes="mt-1 mb-0"
                            height={256}
                        />
                    </div>
                    <div className="col-6">
                        <p className="lexend">
                            Le dépôt <a className="link-main" href={project.github} target="_blank" rel="noopener"> GitHub — image-processor-cpp</a> contient également le code source complet,
                            des exemples d'images et des scénarios de test.
                        </p>
                        <p className="lexend">
                            Pour tester rapidement l'outil sans configuration C++, il suffit de télécharger
                            l'exécutable <a href="/assets/exe/main.exe" className="link-main"><i className="bi bi-filetype-exe me-2"></i>Exécutable</a> puis
                            de l'exécuter en local sur vos images <strong>.ppm</strong>.
                        </p>
                        <p className="lexend">
                            Vous ne disposez pas d'images ? Vous pouvez téléchargez l'image incluse dans ce bloc.
                        </p>
                    </div>
                </article>
            </section>

            <section>
                <h2 className="lexend fw--normal mt-5">Fonctionnalités</h2>
                <ul className="lexend">
                    <li>
                        <strong>Chargement / sauvegarde</strong> de fichiers .ppm (format texte et binaire).
                    </li>
                    <li>
                        <strong>Affichage RGB</strong> et création d'images composantes (R/G/B) pour analyser les canaux séparément.
                    </li>
                    <li>
                        <strong>Histogrammes</strong> (niveaux de gris et couleur) avec plusieurs méthodes d'affichage pour visualiser la distribution des pixels.
                    </li>
                    <li>
                        <strong>Conversion</strong> en niveaux de gris et noir et blanc avec seuillage personnalisable.
                    </li>
                    <li>
                        <strong>Transformations géométriques</strong> : rotation (90°, 180°, 270°), retournement horizontal/vertical, zoom avant/arrière, rognage (crop).
                    </li>
                    <li>
                        <strong>Filtres avancés</strong> : flou, netteté, détection de contours, ajustement luminosité/contraste.
                    </li>
                    <li>
                        <strong>Simulation daltonisme</strong> (approximative) pour tester l'accessibilité des images.
                    </li>
                    <li>
                        <strong>Fonction undo</strong> pour annuler la dernière opération et revenir à l'état précédent.
                    </li>
                </ul>
                <p className="lexend">
                    Les fonctionnalités sont présentées sous forme d'options dans le menu.
                    Insérer l'option de votre choix pour naviguer.
                </p>
                <div className="box w-100">
                    <div className="highlight">
                        <pre className="language-output">
                            <code className="language-output">
                                <span className="token line">
                                    {`Saisissez la lettre correspondante à l'action que vous souhaitez réaliser (il est possible de les enchaîner) : `}
                                    <span className="token highlight">a</span>
                                </span>
                            </code>
                        </pre>
                    </div>
                </div>
            </section>
            
            <section>
                <h3 className="lexend fw--normal mt-5">Chargement et sauvegarde .ppm</h3>
                <section>
                    <p className="lexend">
                        Charge l'image <strong>.ppm</strong> depuis votre répertoire.
                        Entrez simplement le nom de votre image et elle sera chargée en mémoire pour les traitements ultérieurs.
                    </p>
                    <div className="box w-100">
                        <div className="highlight">
                            <pre className="language-output">
                                <code className="language-output">
                                    <span className="token line">
                                        <span className="token mute">Saisissez le nom de fichier.ppm de votre image : </span>
                                        <span className="token highlight">example.ppm</span>
                                    </span>
                                    {`\n`}
                                    <span className="token line">
                                        L'image <span className="token highlight">example.ppm</span> a bien été chargée !
                                    </span>
                                </code>
                            </pre>
                        </div>
                    </div>
                    <p className="lexend">
                        La sauvegarde persiste votre image modifiée au format <strong>.ppm</strong>.
                        L'image sera sauvegardée dans le même répertoire que l'exécutable avec le nom de votre choix.
                    </p>
                    <div className="box w-100">
                        <div className="highlight">
                            <pre className="language-output">
                                <code className="language-output">
                                    <span className="token line">
                                        <span className="token mute">Saisissez le nom de fichier.ppm : </span>
                                        <span className="token highlight">output.ppm</span>
                                    </span>
                                    {`\n`}
                                    <span className="token line">
                                        Le fichier output.ppm a bien été enregistré !
                                    </span>
                                </code>
                            </pre>
                        </div>
                    </div>
                </section>

                <h3 className="lexend fw--normal mt-5">Composantes R / G / B</h3>
                <section>
                    <p className="lexend">
                        Permet de récupérer individuellement les 3 différents canaux rouge / vert / bleu.
                        Cette fonctionnalité isole chaque composante de couleur pour analyser sa contribution à l'image globale.
                    </p>
                    <article className="content-sm">
                        <div className="box-group vertical-group">
                            <ImageBox
                                title="Composante rouge (R)"
                                imgSrc={project_jpg_url + `background-landscape-wide-red.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-red.ppm`}
                                downloadName="example-red.ppm"
                            />
                            <ImageBox
                                title="Composante verte (G)"
                                imgSrc={project_jpg_url + `background-landscape-wide-green.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-green.ppm`}
                                downloadName="example-green.ppm"
                            />
                            <ImageBox
                                title="Composante bleue (B)"
                                imgSrc={project_jpg_url + `background-landscape-wide-blue.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-blue.ppm`}
                                downloadName="example-blue.ppm"
                            />
                        </div>
                    </article>
                    <article className="content-md">
                        <div className="box-group">
                            <ImageBox
                                title="Composante rouge (R)"
                                imgSrc={project_jpg_url + `background-landscape-wide-red.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-red.ppm`}
                                downloadName="example-red.ppm"
                            />
                            <ImageBox
                                title="Composante verte (G)"
                                imgSrc={project_jpg_url + `background-landscape-wide-green.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-green.ppm`}
                                downloadName="example-green.ppm"
                            />
                            <ImageBox
                                title="Composante bleue (B)"
                                imgSrc={project_jpg_url + `background-landscape-wide-blue.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-blue.ppm`}
                                downloadName="example-blue.ppm"
                            />
                        </div>
                    </article>
                    <article className="content-lg row">
                        <div className="col-3">
                            <ImageBox
                                title="Image couleur d'origine"
                                imgSrc={project_img_url}
                                downloadSrc={project_ppm_url + `background-landscape-wide.ppm`}
                                downloadName="example.ppm"
                            />
                        </div>
                        <div className="col-9">
                            <div className="box-group">
                                <ImageBox
                                    title="Composante rouge (R)"
                                    imgSrc={project_jpg_url + `background-landscape-wide-red.jpg`}
                                    downloadSrc={project_ppm_url + `background-landscape-wide-red.ppm`}
                                    downloadName="example-red.ppm"
                                />
                                <ImageBox
                                    title="Composante verte (G)"
                                    imgSrc={project_jpg_url + `background-landscape-wide-green.jpg`}
                                    downloadSrc={project_ppm_url + `background-landscape-wide-green.ppm`}
                                    downloadName="example-green.ppm"
                                />
                                <ImageBox
                                    title="Composante bleue (B)"
                                    imgSrc={project_jpg_url + `background-landscape-wide-blue.jpg`}
                                    downloadSrc={project_ppm_url + `background-landscape-wide-blue.ppm`}
                                    downloadName="example-blue.ppm"
                                />
                            </div>
                        </div>
                    </article>
                    <article className="content-xxl row">
                        <div className="col-3">
                            <ImageBox
                                title="Image couleur d'origine"
                                imgSrc={project_img_url}
                                downloadSrc={project_ppm_url + `background-landscape-wide.ppm`}
                                downloadName="example.ppm"
                                height={256}
                            />
                        </div>
                        <div className="col-9">
                            <div className="box-group">
                                <ImageBox
                                    title="Composante rouge (R)"
                                    imgSrc={project_jpg_url + `background-landscape-wide-red.jpg`}
                                    downloadSrc={project_ppm_url + `background-landscape-wide-red.ppm`}
                                    downloadName="example-red.ppm"
                                    height={256}
                                />
                                <ImageBox
                                    title="Composante verte (G)"
                                    imgSrc={project_jpg_url + `background-landscape-wide-green.jpg`}
                                    downloadSrc={project_ppm_url + `background-landscape-wide-green.ppm`}
                                    downloadName="example-green.ppm"
                                    height={256}
                                />
                                <ImageBox
                                    title="Composante bleue (B)"
                                    imgSrc={project_jpg_url + `background-landscape-wide-blue.jpg`}
                                    downloadSrc={project_ppm_url + `background-landscape-wide-blue.ppm`}
                                    downloadName="example-blue.ppm"
                                    height={256}
                                />
                            </div>
                        </div>
                    </article>
                </section>

                <h3 className="lexend fw--normal mt-5">Histogrammes gris et couleur</h3>
                <section>
                    <p className="lexend">
                        Calcule et affiche la distribution des niveaux de gris ou des canaux couleur.
                        L'histogramme permet d'identifier les plages de luminosité dominantes, de vérifier l'exposition de l'image
                        et d'ajuster le contraste ou la luminosité de manière informée.
                    </p>
                    <article className="content-sm">
                        <div className="box" style={{ height: 256 + "px" }}>
                            <div className="d-flex align-items-center highlight-toolbar border-bottom">
                                <small className="font-monospace text-body-secondary">Histogramme : Distribution des niveaux de gris</small>
                            </div>
                            <div className="highlight-example overflow-hidden d-flex justify-content-center h-100 p-2">
                                <canvas className="histogram-chart"></canvas>
                            </div>
                        </div>
                    </article>
                    <article className="content-lg row">
                        <div className="col-4">
                            <ImageBox
                                title="Image d'origine"
                                imgSrc={project_img_url}
                                downloadSrc={project_ppm_url + `background-landscape-wide.ppm`}
                                downloadName="example.ppm"
                                height={256}
                            />
                        </div>
                        <div className="col-8">
                            <div className="box" style={{ height: 256 + "px" }}>
                                <div className="d-flex align-items-center highlight-toolbar border-bottom">
                                    <small className="font-monospace text-body-secondary">Histogramme : Distribution des niveaux de gris</small>
                                </div>
                                <div className="highlight-example overflow-hidden d-flex justify-content-center h-100 p-2">
                                    <canvas className="histogram-chart"></canvas>
                                </div>
                            </div>
                        </div>
                    </article>
                    <p className="lexend">
                        On observe un pic principal autour des valeurs 140-160, indiquant une bonne exposition avec une majorité de tons moyens. 
                        La distribution est relativement symétrique avec une décroissance progressive vers les extrémités (noir pur et blanc pur), 
                        ce qui suggère une image bien équilibrée avec des détails dans les ombres et les hautes lumières.
                    </p>
                </section>

                <h3 className="lexend fw--normal mt-5">Conversions gris et noir &amp; blanc</h3>
                <section>
                    <p className="lexend">
                        Convertit l'image en niveaux de gris ou en noir et blanc pur par seuillage.
                    </p>
                    <article className="content-sm">
                        <div className="box-group vertical-group">
                            <ImageBox
                                title="Niveaux de gris"
                                imgSrc={project_jpg_url + `background-landscape-wide-gray.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-gray.ppm`}
                                downloadName="example-gray.ppm"
                            />
                            <ImageBox
                                title="Noir et blanc (seuillage)"
                                imgSrc={project_jpg_url + `background-landscape-wide-black-n-white.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-black-n-white.ppm`}
                                downloadName="example-black-n-white.ppm"
                            />
                        </div>
                    </article>
                    <article className="content-md">
                        <div className="box-group">
                            <ImageBox
                                title="Niveaux de gris"
                                imgSrc={project_jpg_url + `background-landscape-wide-gray.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-gray.ppm`}
                                downloadName="example-gray.ppm"
                            />
                            <ImageBox
                                title="Noir et blanc (seuillage)"
                                imgSrc={project_jpg_url + `background-landscape-wide-black-n-white.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-black-n-white.ppm`}
                                downloadName="example-black-n-white.ppm"
                            />
                        </div>
                    </article>
                    <article className="content-lg row">
                        <div className="col-4">
                            <ImageBox
                                title="Image d'origine"
                                imgSrc={project_img_url}
                                downloadSrc={project_ppm_url + `background-landscape-wide.ppm`}
                                downloadName="example.ppm"
                                height={256}
                            />
                        </div>
                        <div className="col-8">
                            <div className="box-group">
                                <ImageBox
                                    title="Niveaux de gris"
                                    imgSrc={project_jpg_url + `background-landscape-wide-gray.jpg`}
                                    downloadSrc={project_ppm_url + `background-landscape-wide-gray.ppm`}
                                    downloadName="example-gray.ppm"
                                    height={256}
                                />
                                <ImageBox
                                    title="Noir et blanc (seuillage)"
                                    imgSrc={project_jpg_url + `background-landscape-wide-black-n-white.jpg`}
                                    downloadSrc={project_ppm_url + `background-landscape-wide-black-n-white.ppm`}
                                    downloadName="example-black-n-white.ppm"
                                    height={256}
                                />
                            </div>
                        </div>
                    </article>
                </section>

                <h3 className="lexend fw--normal mt-4">Transformations géométriques</h3>
                <section>
                    <p className="lexend">
                        Applique des transformations spatiales : rotation (90°, 180°, 270°), retournement horizontal/vertical,
                        zoom avant/arrière et rognage (crop). Ces opérations illustrent le mapping d'indices et la gestion
                        des coordonnées en programmation bas niveau.
                    </p>
                    <article className="content-sm">
                        <h6 className="lexend">Rotation / Retournement</h6>
                        <div className="box-group vertical-group">
                            <ImageBox
                                title="Rotation 90°"
                                imgSrc={project_jpg_url + `background-landscape-wide-90.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-90.ppm`}
                                downloadName="example-90.ppm"
                            />
                            <ImageBox
                                title="Rotation 180°"
                                imgSrc={project_jpg_url + `background-landscape-wide-180.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-180.ppm`}
                                downloadName="example-180.ppm"
                            />
                        </div>
                        <h6 className="lexend">Zoom et rognage (crop)</h6>
                        <div className="box-group vertical-group">
                            <ImageBox
                                title="Rognage"
                                imgSrc={project_jpg_url + `background-landscape-wide-cropped.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-cropped.ppm`}
                                downloadName="example-cropped.ppm"
                            />
                            <ImageBox
                                title="Agrandissement"
                                imgSrc={project_jpg_url + `background-landscape-wide-zoom-out.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-zoom-out.ppm`}
                                downloadName="example-zoom-out.ppm"
                            />
                            <ImageBox
                                title="Rétrécissement"
                                imgSrc={project_jpg_url + `background-landscape-wide-zoom-in.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-zoom-in.ppm`}
                                downloadName="example-zoom-in.ppm"
                            />
                        </div>
                    </article>
                    <article className="content-md">
                        <div className="row">
                            <h6 className="lexend">Rotation / retournement</h6>
                            <div className="box-group">
                                <ImageBox
                                    title="Rotation 90°"
                                    imgSrc={project_jpg_url + `background-landscape-wide-90.jpg`}
                                    downloadSrc={project_ppm_url + `background-landscape-wide-90.ppm`}
                                    downloadName="example-90.ppm"
                                />
                                <ImageBox
                                    title="Rotation 180°"
                                    imgSrc={project_jpg_url + `background-landscape-wide-180.jpg`}
                                    downloadSrc={project_ppm_url + `background-landscape-wide-180.ppm`}
                                    downloadName="example-180.ppm"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <h6 className="lexend">Zoom et rognage (crop)</h6>
                            <div className="box-group">
                                <ImageBox
                                    title="Rognage"
                                    imgSrc={project_jpg_url + `background-landscape-wide-cropped.jpg`}
                                    downloadSrc={project_ppm_url + `background-landscape-wide-cropped.ppm`}
                                    downloadName="example-cropped.ppm"
                                />
                                <ImageBox
                                    title="Agrandissement"
                                    imgSrc={project_jpg_url + `background-landscape-wide-zoom-out.jpg`}
                                    downloadSrc={project_ppm_url + `background-landscape-wide-zoom-out.ppm`}
                                    downloadName="example-zoom-out.ppm"
                                />
                                <ImageBox
                                    title="Rétrécissement"
                                    imgSrc={project_jpg_url + `background-landscape-wide-zoom-in.jpg`}
                                    downloadSrc={project_ppm_url + `background-landscape-wide-zoom-in.ppm`}
                                    downloadName="example-zoom-in.ppm"
                                />
                            </div>
                        </div>
                    </article>
                    <article className="content-lg">
                        <div className="row">
                            <div className="col-8">
                                <h6 className="lexend">Rotation / retournement</h6>
                                <div className="box-group">
                                    <ImageBox
                                    title="Rotation 90°"
                                    imgSrc={project_jpg_url + `background-landscape-wide-90.jpg`}
                                    downloadSrc={project_ppm_url + `background-landscape-wide-90.ppm`}
                                    downloadName="example-90.ppm"
                                    height={256}
                                />
                                <ImageBox
                                    title="Rotation 180°"
                                    imgSrc={project_jpg_url + `background-landscape-wide-180.jpg`}
                                    downloadSrc={project_ppm_url + `background-landscape-wide-180.ppm`}
                                    downloadName="example-180.ppm"
                                    height={256}
                                />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <h6 className="lexend">Zoom et rognage (crop)</h6>
                                <div className="box-group">
                                    <ImageBox
                                        title="Rognage"
                                        imgSrc={project_jpg_url + `background-landscape-wide-cropped.jpg`}
                                        downloadSrc={project_ppm_url + `background-landscape-wide-cropped.ppm`}
                                        downloadName="example-cropped.ppm"
                                        height={256}
                                    />
                                    <ImageBox
                                        title="Agrandissement"
                                        imgSrc={project_jpg_url + `background-landscape-wide-zoom-out.jpg`}
                                        downloadSrc={project_ppm_url + `background-landscape-wide-zoom-out.ppm`}
                                        downloadName="example-zoom-out.ppm"
                                        height={256}
                                    />
                                    <ImageBox
                                        title="Rétrécissement"
                                        imgSrc={project_jpg_url + `background-landscape-wide-zoom-in.jpg`}
                                        downloadSrc={project_ppm_url + `background-landscape-wide-zoom-in.ppm`}
                                        downloadName="example-zoom-in.ppm"
                                        height={256}
                                    />
                                </div>
                            </div>
                        </div>
                    </article>
                </section>

                <h3 className="lexend fw--normal mt-4">Filtres et ajustements</h3>
                <section>
                    <h6 className="lexend">Rotation des couleurs</h6>
                    <article className="content-sm">
                        <div className="box-group vertical-group">
                            <ImageBox
                                title="Rotation une"
                                imgSrc={project_jpg_url + `background-landscape-wide-filter-rotate-1.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-filter-rotate-1.ppm`}
                                downloadName="example-filter-rotate-1.ppm"
                            />
                            <ImageBox
                                title="Rotation deux"
                                imgSrc={project_jpg_url + `background-landscape-wide-filter-rotate-2.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-filter-rotate-2.ppm`}
                                downloadName="example-filter-rotate-2.ppm"
                            />
                        </div>
                    </article>
                    <article className="content-md">
                        <div className="box-group">
                            <ImageBox
                                title="Rotation une"
                                imgSrc={project_jpg_url + `background-landscape-wide-filter-rotate-1.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-filter-rotate-1.ppm`}
                                downloadName="example-filter-rotate-1.ppm"
                            />
                            <ImageBox
                                title="Rotation deux"
                                imgSrc={project_jpg_url + `background-landscape-wide-filter-rotate-2.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-filter-rotate-2.ppm`}
                                downloadName="example-filter-rotate-2.ppm"
                            />
                        </div>
                    </article>
                    <article className="content-lg row">
                        <div className="col-4">
                            <ImageBox
                                title="Image d'origine"
                                imgSrc={project_img_url}
                                downloadSrc={project_ppm_url + `background-landscape-wide.ppm`}
                                downloadName="example.ppm"
                                height={256}
                            />
                        </div>
                        <div className="col-8">
                            <div className="box-group">
                                <ImageBox
                                    title="Rotation une"
                                    imgSrc={project_jpg_url + `background-landscape-wide-filter-rotate-1.jpg`}
                                    downloadSrc={project_ppm_url + `background-landscape-wide-filter-rotate-1.ppm`}
                                    downloadName="example-filter-rotate-1.ppm"
                                    height={256}
                                />
                                <ImageBox
                                    title="Rotation deux"
                                    imgSrc={project_jpg_url + `background-landscape-wide-filter-rotate-2.jpg`}
                                    downloadSrc={project_ppm_url + `background-landscape-wide-filter-rotate-2.ppm`}
                                    downloadName="example-filter-rotate-2.ppm"
                                    height={256}
                                />
                            </div>
                        </div>
                    </article>

                    <h6 className="lexend">Luminosité</h6>
                    <article className="content-sm">
                        <div className="row">
                            <div className="box-group vertical-group">
                                <ImageBox
                                    title="Luminosité réduite"
                                    imgSrc={project_jpg_url + `background-landscape-wide-filter-low-lum.jpg`}
                                    downloadSrc={project_ppm_url + `background-landscape-wide-filter-low-lum.ppm`}
                                    downloadName="example-filter-low-lum.ppm"
                                />
                                <div className="box" style={{ height: 200 + "px" }}>
                                    <div className="d-flex align-items-center highlight-toolbar border-bottom">
                                        <small className="font-monospace text-body-secondary">Histogramme : Distribution des niveaux de gris</small>
                                    </div>
                                    <div className="highlight-example overflow-hidden d-flex justify-content-center h-100 p-2">
                                        <canvas className="histogram-chart-low-lum"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">    
                            <div className="box-group vertical-group">
                                <ImageBox
                                    title="Luminosité augmentée"
                                    imgSrc={project_jpg_url + `background-landscape-wide-filter-high-lum.jpg`}
                                    downloadSrc={project_ppm_url + `background-landscape-wide-filter-high-lum.ppm`}
                                    downloadName="example-filter-high-lum.ppm"
                                />
                                <div className="box" style={{ height: 200 + "px" }}>
                                    <div className="d-flex align-items-center highlight-toolbar border-bottom">
                                        <small className="font-monospace text-body-secondary">Histogramme : Distribution des niveaux de gris</small>
                                    </div>
                                    <div className="highlight-example overflow-hidden d-flex justify-content-center h-100 p-2">
                                        <canvas className="histogram-chart-high-lum"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article className="content-lg">
                        <div className="row">
                            <div className="col-4">
                                <ImageBox
                                    title="Luminosité réduite"
                                    imgSrc={project_jpg_url + `background-landscape-wide-filter-low-lum.jpg`}
                                    downloadSrc={project_ppm_url + `background-landscape-wide-filter-low-lum.ppm`}
                                    downloadName="example-filter-low-lum.ppm"
                                    height={256}
                                />
                            </div>
                            <div className="col-8">
                                <div className="box" style={{ height: 256 + "px" }}>
                                    <div className="d-flex align-items-center highlight-toolbar border-bottom">
                                        <small className="font-monospace text-body-secondary">Histogramme : Distribution des niveaux de gris</small>
                                    </div>
                                    <div className="highlight-example overflow-hidden d-flex justify-content-center h-100 p-2">
                                        <canvas className="histogram-chart-low-lum"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">    
                            <div className="col-4">
                                <ImageBox
                                    title="Luminosité augmentée"
                                    imgSrc={project_jpg_url + `background-landscape-wide-filter-high-lum.jpg`}
                                    downloadSrc={project_ppm_url + `background-landscape-wide-filter-high-lum.ppm`}
                                    downloadName="example-filter-high-lum.ppm"
                                    height={256}
                                />
                            </div>
                            <div className="col-8">
                                <div className="box" style={{ height: 256 + "px" }}>
                                    <div className="d-flex align-items-center highlight-toolbar border-bottom">
                                        <small className="font-monospace text-body-secondary">Histogramme : Distribution des niveaux de gris</small>
                                    </div>
                                    <div className="highlight-example overflow-hidden d-flex justify-content-center h-100 p-2">
                                        <canvas className="histogram-chart-high-lum"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    <h6 className="lexend">Contraste</h6>
                    <article className="content-sm">
                        <div className="box-group">
                            <ImageBox
                                title="Contraste réduit"
                                imgSrc={project_jpg_url + `background-landscape-wide-filter-low-con.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-filter-low-con.ppm`}
                                downloadName="example-filter-low-con.ppm"
                            />
                            <ImageBox
                                title="Contraste augmenté"
                                imgSrc={project_jpg_url + `background-landscape-wide-filter-high-con.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-filter-high-con.ppm`}
                                downloadName="example-filter-high-con.ppm"
                            />
                        </div>
                    </article>
                    <article className="content-lg row">
                        <div className="col-6">
                            <ImageBox
                                title="Contraste réduit"
                                imgSrc={project_jpg_url + `background-landscape-wide-filter-low-con.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-filter-low-con.ppm`}
                                downloadName="example-filter-low-con.ppm"
                                height={256}
                            />
                        </div>
                        <div className="col-6">
                            <ImageBox
                                title="Contraste augmenté"
                                imgSrc={project_jpg_url + `background-landscape-wide-filter-high-con.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-filter-high-con.ppm`}
                                downloadName="example-filter-high-con.ppm"
                                height={256}
                            />
                        </div>
                    </article>

                    <h6 className="lexend">Simulation de daltonisme</h6>
                    <article className="content-sm">
                        <div className="box-group vertical-group">
                            <ImageBox
                                title="Deuteranopie"
                                imgSrc={project_jpg_url + `background-landscape-wide-deuteranope.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-deuteranope.ppm`}
                                downloadName="example-deuteranope.ppm"
                            />
                            <ImageBox
                                title="Protanopie"
                                imgSrc={project_jpg_url + `background-landscape-wide-protanope.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-protanope.ppm`}
                                downloadName="example-protanope.ppm"
                            />
                            <ImageBox
                                title="Tripanopie"
                                imgSrc={project_jpg_url + `background-landscape-wide-tripanope.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-tripanope.ppm`}
                                downloadName="example-tripanope.ppm"
                            />
                        </div>
                    </article>
                    <article className="content-md">
                        <div className="box-group">
                            <ImageBox
                                title="Deuteranopie"
                                imgSrc={project_jpg_url + `background-landscape-wide-deuteranope.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-deuteranope.ppm`}
                                downloadName="example-deuteranope.ppm"
                            />
                            <ImageBox
                                title="Protanopie"
                                imgSrc={project_jpg_url + `background-landscape-wide-protanope.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-protanope.ppm`}
                                downloadName="example-protanope.ppm"
                            />
                            <ImageBox
                                title="Tripanopie"
                                imgSrc={project_jpg_url + `background-landscape-wide-tripanope.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-tripanope.ppm`}
                                downloadName="example-tripanope.ppm"
                            />
                        </div>
                    </article>
                    <article className="content-lg">
                        <div className="box-group">
                            <ImageBox
                                title="Deuteranopie"
                                imgSrc={project_jpg_url + `background-landscape-wide-deuteranope.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-deuteranope.ppm`}
                                downloadName="example-deuteranope.ppm"
                                height={256}
                            />
                            <ImageBox
                                title="Protanopie"
                                imgSrc={project_jpg_url + `background-landscape-wide-protanope.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-protanope.ppm`}
                                downloadName="example-protanope.ppm"
                                height={256}
                            />
                            <ImageBox
                                title="Tripanopie"
                                imgSrc={project_jpg_url + `background-landscape-wide-tripanope.jpg`}
                                downloadSrc={project_ppm_url + `background-landscape-wide-tripanope.ppm`}
                                downloadName="example-tripanope.ppm"
                                height={256}
                            />
                        </div>
                    </article>
                </section>
            </section>
        </main>
    );
}

function ImageBox({ title, imgSrc, downloadSrc, downloadName, classes, height = 200 }) {
    return (
        <div className={classes ? "box " + classes : "box"} style={{ height: height + "px" }}>
            <div className="d-flex align-items-center highlight-toolbar border-bottom">
                <small className="font-monospace text-body-secondary">{title}</small>
                <div className="d-flex ms-auto">
                    {downloadSrc && (
                        <a href={downloadSrc}
                            type="button" className="btn-download"
                            data-bs-toggle="tooltip"
                            data-bs-custom-class="tooltip-main"
                            data-bs-title="Download"
                            download={downloadName}>
                            <i className="bi bi-download"></i>
                        </a>
                    )}
                </div>
            </div>
            <div className="highlight-example overflow-hidden d-flex justify-content-center p-2">
                <img src={imgSrc} className="rounded object-fit-cover w-100 h-100" loading="lazy" decoding="async" alt={title}></img>
            </div>
        </div>
    );
}

// Global expose
window.ImageProcessor = ImageProcessor;