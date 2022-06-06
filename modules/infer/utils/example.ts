import { Document } from "@/server/routers/document";

export const contentExample = `Nell'ultima puntata di Non è l'arena, programma in onda la domenica sera su La7, si è parlato anche di armi nucleari. Un argomento attuale su cui è necessario essere chiari e che va trattato con estrema prudenza, visto che le conseguenze potrebbero essere tanto imprevedibili quanto drammatiche. In merito si è espresso il giornalista russo Vladimir Solovyev, che ha voluto fare una precisazione di grande rilievo: "La Russia sa quando può usare l'arma nucleare. Lo strategico utilizzo è possibile solo quando ci sono esistenziali pericoli per il nostro Paese".

Poi Solovyev è stato ancora più netto e - senza ricorrere a giri di parole - ha tenuto a rassicurare che l'arma nucleare "non può essere usata contro l'Ucraina", in nessun modo. Infine è arrivata la precisazione che dà il segno di come i rapporti con gli Usa si stiano facendo sempre più pericolosi: l'arma nucleare potrebbe essere usata contro gli Stati Uniti, "ma solo come risposta". Questo vorrebbe dire che all'inizio gli Usa avrebbero colpito la Russia, che di seguito sarebbe chiamata a rispondere. "In quel caso utilizzeremmo la nostra arma nucleare", ha avvertito il giornalista russo.
`;

export const annotationsExample = {
  "annotation_sets": {
    "sentences": {
      "name": "sentences",
      "annotations": [
        {
          "type": "sentence",
          "start": 0,
          "end": 117,
          "id": 0,
          "features": {
            "source": "spacy",
            "spacy_model": "it_core_news_lg"
          }
        },
        {
          "type": "sentence",
          "start": 118,
          "end": 295,
          "id": 1,
          "features": {
            "source": "spacy",
            "spacy_model": "it_core_news_lg"
          }
        },
        {
          "type": "sentence",
          "start": 296,
          "end": 414,
          "id": 2,
          "features": {
            "source": "spacy",
            "spacy_model": "it_core_news_lg"
          }
        },
        {
          "type": "sentence",
          "start": 415,
          "end": 462,
          "id": 3,
          "features": {
            "source": "spacy",
            "spacy_model": "it_core_news_lg"
          }
        },
        {
          "type": "sentence",
          "start": 463,
          "end": 561,
          "id": 4,
          "features": {
            "source": "spacy",
            "spacy_model": "it_core_news_lg"
          }
        },
        {
          "type": "sentence",
          "start": 561,
          "end": 740,
          "id": 5,
          "features": {
            "source": "spacy",
            "spacy_model": "it_core_news_lg"
          }
        },
        {
          "type": "sentence",
          "start": 741,
          "end": 862,
          "id": 6,
          "features": {
            "source": "spacy",
            "spacy_model": "it_core_news_lg"
          }
        },
        {
          "type": "sentence",
          "start": 863,
          "end": 949,
          "id": 7,
          "features": {
            "source": "spacy",
            "spacy_model": "it_core_news_lg"
          }
        },
        {
          "type": "sentence",
          "start": 950,
          "end": 1068,
          "id": 8,
          "features": {
            "source": "spacy",
            "spacy_model": "it_core_news_lg"
          }
        },
        {
          "type": "sentence",
          "start": 1069,
          "end": 1157,
          "id": 9,
          "features": {
            "source": "spacy",
            "spacy_model": "it_core_news_lg"
          }
        }
      ],
      "next_annid": 10
    },
    "entities": {
      "name": "entities",
      "annotations": [
        {
          "type": "MISC",
          "start": 23,
          "end": 36,
          "id": 0,
          "features": {
            "ner": {
              "type": "MISC",
              "score": 1,
              "source": "spacy",
              "spacy_model": "it_core_news_lg"
            },
            "linking": {
              "encoding": "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",
              "source": "blink_biencoder",
              "top_candidate": {
                "raw_score": 190.73341369628906,
                "id": 1445399,
                "wikipedia_id": 6591634,
                "wikidata_qid": 42727757,
                "redirects_to": -1,
                "title": "Non è l'Arena",
                "url": "https://it.wikipedia.org/wiki?curid=6591634",
                "type_": null,
                "indexer": 130,
                "score": 113.15785217285156,
                "norm_score": 0.5870863388723311
              },
              "candidates": [
                {
                  "raw_score": 190.73341369628906,
                  "id": 1445399,
                  "wikipedia_id": 6591634,
                  "wikidata_qid": 42727757,
                  "redirects_to": -1,
                  "title": "Non è l'Arena",
                  "url": "https://it.wikipedia.org/wiki?curid=6591634",
                  "type_": null,
                  "indexer": 130,
                  "score": 113.15785217285156,
                  "norm_score": 0.5870863388723311
                },
                {
                  "raw_score": 208.3998260498047,
                  "id": 47971,
                  "wikipedia_id": 6428360,
                  "wikidata_qid": 30899131,
                  "redirects_to": -1,
                  "title": "Non è il Sudamerica",
                  "url": "https://it.wikipedia.org/wiki?curid=6428360",
                  "type_": null,
                  "indexer": 130,
                  "score": 104.32463836669922,
                  "norm_score": 0.5412577988784032
                },
                {
                  "raw_score": 210.1240692138672,
                  "id": 1370392,
                  "wikipedia_id": 217875,
                  "wikidata_qid": 3878204,
                  "redirects_to": -1,
                  "title": "Non è la Rai",
                  "url": "https://it.wikipedia.org/wiki?curid=217875",
                  "type_": null,
                  "indexer": 130,
                  "score": 103.46257019042969,
                  "norm_score": 0.5367852108984605
                },
                {
                  "raw_score": 211.76727294921875,
                  "id": 876917,
                  "wikipedia_id": 2079270,
                  "wikidata_qid": 60836680,
                  "redirects_to": -1,
                  "title": "Non è Francesca",
                  "url": "https://it.wikipedia.org/wiki?curid=2079270",
                  "type_": null,
                  "indexer": 130,
                  "score": 102.64100646972656,
                  "norm_score": 0.5325227684105883
                },
                {
                  "raw_score": 212.15931701660156,
                  "id": 627960,
                  "wikipedia_id": 7859297,
                  "wikidata_qid": 62059621,
                  "redirects_to": -1,
                  "title": "Live - Non è la D'Urso",
                  "url": "https://it.wikipedia.org/wiki?curid=7859297",
                  "type_": null,
                  "indexer": 130,
                  "score": 102.4449691772461,
                  "norm_score": 0.5315056863953782
                },
                {
                  "raw_score": 213.72166442871094,
                  "id": 1276090,
                  "wikipedia_id": 3903090,
                  "wikidata_qid": 3878196,
                  "redirects_to": -1,
                  "title": "Non è l'inferno",
                  "url": "https://it.wikipedia.org/wiki?curid=3903090",
                  "type_": null,
                  "indexer": 130,
                  "score": 101.66370391845703,
                  "norm_score": 0.5274523206619072
                },
                {
                  "raw_score": 214.27651977539062,
                  "id": 1359290,
                  "wikipedia_id": 152928,
                  "wikidata_qid": 406466,
                  "redirects_to": -1,
                  "title": "L'isola dei famosi",
                  "url": "https://it.wikipedia.org/wiki?curid=152928",
                  "type_": null,
                  "indexer": 130,
                  "score": 101.3863754272461,
                  "norm_score": 0.5260134830961207
                },
                {
                  "raw_score": 214.65313720703125,
                  "id": 193477,
                  "wikipedia_id": 5079880,
                  "wikidata_qid": 17635250,
                  "redirects_to": -1,
                  "title": "L'Arena (programma televisivo)",
                  "url": "https://it.wikipedia.org/wiki?curid=5079880",
                  "type_": null,
                  "indexer": 130,
                  "score": 101.19805145263672,
                  "norm_score": 0.5250364193691915
                },
                {
                  "raw_score": 214.99533081054688,
                  "id": 109711,
                  "wikipedia_id": 1222301,
                  "wikidata_qid": 3878229,
                  "redirects_to": -1,
                  "title": "Non è una favola",
                  "url": "https://it.wikipedia.org/wiki?curid=1222301",
                  "type_": null,
                  "indexer": 130,
                  "score": 101.0269546508789,
                  "norm_score": 0.5241487337777108
                },
                {
                  "raw_score": 215.35275268554688,
                  "id": 1181617,
                  "wikipedia_id": 1715115,
                  "wikidata_qid": 3878046,
                  "redirects_to": -1,
                  "title": "Non esiste più la mezza stagione",
                  "url": "https://it.wikipedia.org/wiki?curid=1715115",
                  "type_": null,
                  "indexer": 130,
                  "score": 100.84818267822266,
                  "norm_score": 0.5232212278123322
                }
              ],
              "nil_score": 0.819351015670015,
              "is_nil": false
            }
          }
        },
        {
          "type": "ORG",
          "start": 76,
          "end": 79,
          "id": 1,
          "features": {
            "ner": {
              "type": "ORG",
              "score": 1,
              "source": "spacy",
              "spacy_model": "it_core_news_lg"
            },
            "linking": {
              "encoding": "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",
              "source": "blink_biencoder",
              "top_candidate": {
                "raw_score": 157.39663696289062,
                "id": 227483,
                "wikipedia_id": 257980,
                "wikidata_qid": 1235261,
                "redirects_to": -1,
                "title": "LA7",
                "url": "https://it.wikipedia.org/wiki?curid=257980",
                "type_": null,
                "indexer": 130,
                "score": 124.43309020996094,
                "norm_score": 0.6838546892595149
              },
              "candidates": [
                {
                  "raw_score": 157.39663696289062,
                  "id": 227483,
                  "wikipedia_id": 257980,
                  "wikidata_qid": 1235261,
                  "redirects_to": -1,
                  "title": "LA7",
                  "url": "https://it.wikipedia.org/wiki?curid=257980",
                  "type_": null,
                  "indexer": 130,
                  "score": 124.43309020996094,
                  "norm_score": 0.6838546892595149
                },
                {
                  "raw_score": 185.04833984375,
                  "id": 876237,
                  "wikipedia_id": 2066841,
                  "wikidata_qid": 3804128,
                  "redirects_to": -1,
                  "title": "Italia 7",
                  "url": "https://it.wikipedia.org/wiki?curid=2066841",
                  "type_": null,
                  "indexer": 130,
                  "score": 110.60722351074219,
                  "norm_score": 0.6078710119323336
                },
                {
                  "raw_score": 185.13998413085938,
                  "id": 871491,
                  "wikipedia_id": 2050438,
                  "wikidata_qid": 3655037,
                  "redirects_to": -1,
                  "title": "Canale 7",
                  "url": "https://it.wikipedia.org/wiki?curid=2050438",
                  "type_": null,
                  "indexer": 130,
                  "score": 110.5614013671875,
                  "norm_score": 0.607619184322098
                },
                {
                  "raw_score": 185.40785217285156,
                  "id": 777104,
                  "wikipedia_id": 3273074,
                  "wikidata_qid": 3979794,
                  "redirects_to": -1,
                  "title": "TV7 (piattaforma televisiva)",
                  "url": "https://it.wikipedia.org/wiki?curid=3273074",
                  "type_": null,
                  "indexer": 130,
                  "score": 110.427490234375,
                  "norm_score": 0.6068832405633812
                },
                {
                  "raw_score": 186.20802307128906,
                  "id": 1416334,
                  "wikipedia_id": 4535254,
                  "wikidata_qid": 15102768,
                  "redirects_to": -1,
                  "title": "LA7 (azienda)",
                  "url": "https://it.wikipedia.org/wiki?curid=4535254",
                  "type_": null,
                  "indexer": 130,
                  "score": 110.02735900878906,
                  "norm_score": 0.6046842144484273
                },
                {
                  "raw_score": 186.87600708007812,
                  "id": 807316,
                  "wikipedia_id": 520090,
                  "wikidata_qid": 3979539,
                  "redirects_to": -1,
                  "title": "TG LA7",
                  "url": "https://it.wikipedia.org/wiki?curid=520090",
                  "type_": null,
                  "indexer": 130,
                  "score": 109.69336700439453,
                  "norm_score": 0.6028486737735554
                },
                {
                  "raw_score": 189.2896728515625,
                  "id": 969555,
                  "wikipedia_id": 1935517,
                  "wikidata_qid": 19616,
                  "redirects_to": -1,
                  "title": "Rai",
                  "url": "https://it.wikipedia.org/wiki?curid=1935517",
                  "type_": null,
                  "indexer": 130,
                  "score": 108.486572265625,
                  "norm_score": 0.5962164167132451
                },
                {
                  "raw_score": 190.67201232910156,
                  "id": 865112,
                  "wikipedia_id": 2091431,
                  "wikidata_qid": 3979796,
                  "redirects_to": -1,
                  "title": "TV7 Lombardia",
                  "url": "https://it.wikipedia.org/wiki?curid=2091431",
                  "type_": null,
                  "indexer": 130,
                  "score": 107.79531860351562,
                  "norm_score": 0.592417450879449
                },
                {
                  "raw_score": 190.69834899902344,
                  "id": 752698,
                  "wikipedia_id": 4819407,
                  "wikidata_qid": 13107381,
                  "redirects_to": -1,
                  "title": "LaF (rete televisiva)",
                  "url": "https://it.wikipedia.org/wiki?curid=4819407",
                  "type_": null,
                  "indexer": 130,
                  "score": 107.78221130371094,
                  "norm_score": 0.5923454162749894
                },
                {
                  "raw_score": 190.89382934570312,
                  "id": 905577,
                  "wikipedia_id": 807415,
                  "wikidata_qid": 3820620,
                  "redirects_to": -1,
                  "title": "La 6",
                  "url": "https://it.wikipedia.org/wiki?curid=807415",
                  "type_": null,
                  "indexer": 130,
                  "score": 107.68447875976562,
                  "norm_score": 0.5918083014419695
                }
              ],
              "nil_score": 0.8633891102475046,
              "is_nil": false
            }
          }
        },
        {
          "type": "PER",
          "start": 341,
          "end": 358,
          "id": 2,
          "features": {
            "ner": {
              "type": "PER",
              "score": 1,
              "source": "spacy",
              "spacy_model": "it_core_news_lg"
            },
            "linking": {
              "source": "blink_biencoder",
              "top_candidate": {
                "raw_score": 254.25527954101562,
                "id": 1008782,
                "wikipedia_id": 9284810,
                "wikidata_qid": -1,
                "redirects_to": -1,
                "title": "Vladimir Gubarev",
                "url": "https://it.wikipedia.org/wiki?curid=9284810",
                "type_": null,
                "indexer": 130,
                "score": 96.90465545654297,
                "norm_score": 0.4330734683614798
              },
              "candidates": [
                {
                  "raw_score": 254.25527954101562,
                  "id": 1008782,
                  "wikipedia_id": 9284810,
                  "wikidata_qid": -1,
                  "redirects_to": -1,
                  "title": "Vladimir Gubarev",
                  "url": "https://it.wikipedia.org/wiki?curid=9284810",
                  "type_": null,
                  "indexer": 130,
                  "score": 96.90465545654297,
                  "norm_score": 0.4330734683614798
                },
                {
                  "raw_score": 254.5052490234375,
                  "id": 121661,
                  "wikipedia_id": 1104764,
                  "wikidata_qid": 189435,
                  "redirects_to": -1,
                  "title": "Vladimir Voronin",
                  "url": "https://it.wikipedia.org/wiki?curid=1104764",
                  "type_": null,
                  "indexer": 130,
                  "score": 96.7796630859375,
                  "norm_score": 0.43251486899180236
                },
                {
                  "raw_score": 255.04518127441406,
                  "id": 1353177,
                  "wikipedia_id": 2364727,
                  "wikidata_qid": 518070,
                  "redirects_to": -1,
                  "title": "Aleksandr Konstantinovič Voronskij",
                  "url": "https://it.wikipedia.org/wiki?curid=2364727",
                  "type_": null,
                  "indexer": 130,
                  "score": 96.50978088378906,
                  "norm_score": 0.4313087471519092
                },
                {
                  "raw_score": 255.70654296875,
                  "id": 722666,
                  "wikipedia_id": 4950091,
                  "wikidata_qid": 382145,
                  "redirects_to": -1,
                  "title": "Vladimir Aleksandrovič Krjučkov",
                  "url": "https://it.wikipedia.org/wiki?curid=4950091",
                  "type_": null,
                  "indexer": 130,
                  "score": 96.17906951904297,
                  "norm_score": 0.4298307756645499
                },
                {
                  "raw_score": 256.0297546386719,
                  "id": 860902,
                  "wikipedia_id": 2049993,
                  "wikidata_qid": 382226,
                  "redirects_to": -1,
                  "title": "Vladimir Kirillovič Romanov",
                  "url": "https://it.wikipedia.org/wiki?curid=2049993",
                  "type_": null,
                  "indexer": 130,
                  "score": 96.01752471923828,
                  "norm_score": 0.42910882101317044
                },
                {
                  "raw_score": 256.0301513671875,
                  "id": 1031788,
                  "wikipedia_id": 2236551,
                  "wikidata_qid": 319896,
                  "redirects_to": -1,
                  "title": "Vladimir Žabotinskij",
                  "url": "https://it.wikipedia.org/wiki?curid=2236551",
                  "type_": null,
                  "indexer": 130,
                  "score": 96.0173110961914,
                  "norm_score": 0.42910786631730574
                },
                {
                  "raw_score": 256.2107849121094,
                  "id": 353070,
                  "wikipedia_id": 6877049,
                  "wikidata_qid": 4113108,
                  "redirects_to": -1,
                  "title": "Miron Konstantinovič Vladimirov",
                  "url": "https://it.wikipedia.org/wiki?curid=6877049",
                  "type_": null,
                  "indexer": 130,
                  "score": 95.92700958251953,
                  "norm_score": 0.42870430273679533
                },
                {
                  "raw_score": 259.37054443359375,
                  "id": 1323973,
                  "wikipedia_id": 113350,
                  "wikidata_qid": 36591,
                  "redirects_to": -1,
                  "title": "Vladimir Nabokov",
                  "url": "https://it.wikipedia.org/wiki?curid=113350",
                  "type_": null,
                  "indexer": 130,
                  "score": 94.34710693359375,
                  "norm_score": 0.4216436107956263
                },
                {
                  "raw_score": 260.40972900390625,
                  "id": 1184027,
                  "wikipedia_id": 25799,
                  "wikidata_qid": 161092,
                  "redirects_to": -1,
                  "title": "Vladimir Borisovič Kramnik",
                  "url": "https://it.wikipedia.org/wiki?curid=25799",
                  "type_": null,
                  "indexer": 130,
                  "score": 93.82746124267578,
                  "norm_score": 0.4193212790085238
                },
                {
                  "raw_score": 260.5303039550781,
                  "id": 926323,
                  "wikipedia_id": 7637214,
                  "wikidata_qid": 12488,
                  "redirects_to": -1,
                  "title": "Vladimir Korotkov",
                  "url": "https://it.wikipedia.org/wiki?curid=7637214",
                  "type_": null,
                  "indexer": 130,
                  "score": 93.76718139648438,
                  "norm_score": 0.4190518842932811
                }
              ],
              "nil_score": 0.22332555651563557,
              "is_nil": true
            },
            "cluster": 0
          }
        },
        {
          "type": "LOC",
          "start": 419,
          "end": 425,
          "id": 3,
          "features": {
            "ner": {
              "type": "LOC",
              "score": 1,
              "source": "spacy",
              "spacy_model": "it_core_news_lg"
            },
            "linking": {
              "encoding": "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",
              "source": "blink_biencoder",
              "top_candidate": {
                "raw_score": 109.93002319335938,
                "id": 1336211,
                "wikipedia_id": 2378921,
                "wikidata_qid": 159,
                "redirects_to": -1,
                "title": "Russia",
                "url": "https://it.wikipedia.org/wiki?curid=2378921",
                "type_": null,
                "indexer": 130,
                "score": 126.35441589355469,
                "norm_score": 0.8002019599151627
              },
              "candidates": [
                {
                  "raw_score": 109.93002319335938,
                  "id": 1336211,
                  "wikipedia_id": 2378921,
                  "wikidata_qid": 159,
                  "redirects_to": -1,
                  "title": "Russia",
                  "url": "https://it.wikipedia.org/wiki?curid=2378921",
                  "type_": null,
                  "indexer": 130,
                  "score": 126.35441589355469,
                  "norm_score": 0.8002019599151627
                },
                {
                  "raw_score": 113.41390228271484,
                  "id": 1492219,
                  "wikipedia_id": 383895,
                  "wikidata_qid": 34266,
                  "redirects_to": -1,
                  "title": "Impero russo",
                  "url": "https://it.wikipedia.org/wiki?curid=383895",
                  "type_": null,
                  "indexer": 130,
                  "score": 124.61248779296875,
                  "norm_score": 0.7876161393181998
                },
                {
                  "raw_score": 118.78013610839844,
                  "id": 1384583,
                  "wikipedia_id": 153230,
                  "wikidata_qid": 190795,
                  "redirects_to": -1,
                  "title": "Roscosmos",
                  "url": "https://it.wikipedia.org/wiki?curid=153230",
                  "type_": null,
                  "indexer": 130,
                  "score": 121.92937469482422,
                  "norm_score": 0.7657419883426199
                },
                {
                  "raw_score": 122.06636047363281,
                  "id": 852553,
                  "wikipedia_id": 2734502,
                  "wikidata_qid": 186096,
                  "redirects_to": -1,
                  "title": "Regno russo",
                  "url": "https://it.wikipedia.org/wiki?curid=2734502",
                  "type_": null,
                  "indexer": 130,
                  "score": 120.2862548828125,
                  "norm_score": 0.7666136931178187
                },
                {
                  "raw_score": 122.25160217285156,
                  "id": 1401572,
                  "wikipedia_id": 226910,
                  "wikidata_qid": 5118,
                  "redirects_to": -1,
                  "title": "Daghestan",
                  "url": "https://it.wikipedia.org/wiki?curid=226910",
                  "type_": null,
                  "indexer": 130,
                  "score": 120.1936264038086,
                  "norm_score": 0.7464554916524198
                },
                {
                  "raw_score": 122.5569076538086,
                  "id": 1333543,
                  "wikipedia_id": 2362505,
                  "wikidata_qid": 7835,
                  "redirects_to": -1,
                  "title": "Crimea",
                  "url": "https://it.wikipedia.org/wiki?curid=2362505",
                  "type_": null,
                  "indexer": 130,
                  "score": 120.04096984863281,
                  "norm_score": 0.7586063707303571
                },
                {
                  "raw_score": 123.68016052246094,
                  "id": 449288,
                  "wikipedia_id": 505085,
                  "wikidata_qid": 465283,
                  "redirects_to": -1,
                  "title": "Voenno-morskoj flot (Federazione Russa)",
                  "url": "https://it.wikipedia.org/wiki?curid=505085",
                  "type_": null,
                  "indexer": 130,
                  "score": 119.4793701171875,
                  "norm_score": 0.7266163744303584
                },
                {
                  "raw_score": 123.98960876464844,
                  "id": 1186177,
                  "wikipedia_id": 591,
                  "wikidata_qid": 251395,
                  "redirects_to": -1,
                  "title": "Armata Rossa",
                  "url": "https://it.wikipedia.org/wiki?curid=591",
                  "type_": null,
                  "indexer": 130,
                  "score": 119.32463073730469,
                  "norm_score": 0.7332052867351856
                },
                {
                  "raw_score": 124.12550354003906,
                  "id": 764114,
                  "wikipedia_id": 84997,
                  "wikidata_qid": 7737,
                  "redirects_to": -1,
                  "title": "Lingua russa",
                  "url": "https://it.wikipedia.org/wiki?curid=84997",
                  "type_": null,
                  "indexer": 130,
                  "score": 119.2567138671875,
                  "norm_score": 0.7356530316884309
                },
                {
                  "raw_score": 124.46540069580078,
                  "id": 1185177,
                  "wikipedia_id": 4366,
                  "wikidata_qid": 15180,
                  "redirects_to": -1,
                  "title": "Unione Sovietica",
                  "url": "https://it.wikipedia.org/wiki?curid=4366",
                  "type_": null,
                  "indexer": 130,
                  "score": 119.08671569824219,
                  "norm_score": 0.7475386111737392
                }
              ],
              "nil_score": 0.8699213462408187,
              "is_nil": false
            }
          }
        },
        {
          "type": "LOC",
          "start": 554,
          "end": 559,
          "id": 4,
          "features": {
            "ner": {
              "type": "LOC",
              "score": 1,
              "source": "spacy",
              "spacy_model": "it_core_news_lg"
            },
            "linking": {
              "source": "blink_biencoder",
              "top_candidate": {
                "raw_score": 117.88526916503906,
                "id": 878917,
                "wikipedia_id": 2021453,
                "wikidata_qid": 7275,
                "redirects_to": -1,
                "title": "Stato",
                "url": "https://it.wikipedia.org/wiki?curid=2021453",
                "type_": null,
                "indexer": 130,
                "score": 124.84795379638672,
                "norm_score": 0.7844327524943017
              },
              "candidates": [
                {
                  "raw_score": 117.88526916503906,
                  "id": 878917,
                  "wikipedia_id": 2021453,
                  "wikidata_qid": 7275,
                  "redirects_to": -1,
                  "title": "Stato",
                  "url": "https://it.wikipedia.org/wiki?curid=2021453",
                  "type_": null,
                  "indexer": 130,
                  "score": 124.84795379638672,
                  "norm_score": 0.7844327524943017
                },
                {
                  "raw_score": 119.14859771728516,
                  "id": 1308775,
                  "wikipedia_id": 122854,
                  "wikidata_qid": 5481,
                  "redirects_to": -1,
                  "title": "Tatarstan",
                  "url": "https://it.wikipedia.org/wiki?curid=122854",
                  "type_": null,
                  "indexer": 130,
                  "score": 124.21630859375,
                  "norm_score": 0.7965778025808908
                },
                {
                  "raw_score": 120.25849914550781,
                  "id": 641194,
                  "wikipedia_id": 635850,
                  "wikidata_qid": 1914,
                  "redirects_to": -1,
                  "title": "Repubblica di Carelia",
                  "url": "https://it.wikipedia.org/wiki?curid=635850",
                  "type_": null,
                  "indexer": 130,
                  "score": 123.66133117675781,
                  "norm_score": 0.7865900380105243
                },
                {
                  "raw_score": 120.61253356933594,
                  "id": 31353,
                  "wikipedia_id": 5725969,
                  "wikidata_qid": 244165,
                  "redirects_to": -1,
                  "title": "Repubblica dell'Artsakh",
                  "url": "https://it.wikipedia.org/wiki?curid=5725969",
                  "type_": null,
                  "indexer": 130,
                  "score": 123.48430633544922,
                  "norm_score": 0.7616123417509616
                },
                {
                  "raw_score": 120.63801574707031,
                  "id": 768475,
                  "wikipedia_id": 69784,
                  "wikidata_qid": 265,
                  "redirects_to": -1,
                  "title": "Uzbekistan",
                  "url": "https://it.wikipedia.org/wiki?curid=69784",
                  "type_": null,
                  "indexer": 130,
                  "score": 123.47157287597656,
                  "norm_score": 0.7561003584590591
                },
                {
                  "raw_score": 120.80253601074219,
                  "id": 1336211,
                  "wikipedia_id": 2378921,
                  "wikidata_qid": 159,
                  "redirects_to": -1,
                  "title": "Russia",
                  "url": "https://it.wikipedia.org/wiki?curid=2378921",
                  "type_": null,
                  "indexer": 130,
                  "score": 123.38932800292969,
                  "norm_score": 0.7814240713497353
                },
                {
                  "raw_score": 120.85802459716797,
                  "id": 1399235,
                  "wikipedia_id": 148304,
                  "wikidata_qid": 5340,
                  "redirects_to": -1,
                  "title": "Mordovia",
                  "url": "https://it.wikipedia.org/wiki?curid=148304",
                  "type_": null,
                  "indexer": 130,
                  "score": 123.36158752441406,
                  "norm_score": 0.7837833337983436
                },
                {
                  "raw_score": 120.93783569335938,
                  "id": 981131,
                  "wikipedia_id": 1926571,
                  "wikidata_qid": 399,
                  "redirects_to": -1,
                  "title": "Armenia",
                  "url": "https://it.wikipedia.org/wiki?curid=1926571",
                  "type_": null,
                  "indexer": 130,
                  "score": 123.32168579101562,
                  "norm_score": 0.7703742235459751
                },
                {
                  "raw_score": 121.0362319946289,
                  "id": 968201,
                  "wikipedia_id": 1924322,
                  "wikidata_qid": 232,
                  "redirects_to": -1,
                  "title": "Kazakistan",
                  "url": "https://it.wikipedia.org/wiki?curid=1924322",
                  "type_": null,
                  "indexer": 130,
                  "score": 123.27249145507812,
                  "norm_score": 0.7708919207320873
                },
                {
                  "raw_score": 122.11901092529297,
                  "id": 1319330,
                  "wikipedia_id": 111261,
                  "wikidata_qid": 6809,
                  "redirects_to": -1,
                  "title": "Buriazia",
                  "url": "https://it.wikipedia.org/wiki?curid=111261",
                  "type_": null,
                  "indexer": 130,
                  "score": 122.73108673095703,
                  "norm_score": 0.7572945186700591
                }
              ],
              "nil_score": 0.06389214563809084,
              "is_nil": true
            },
            "cluster": 3
          }
        },
        {
          "type": "PER",
          "start": 567,
          "end": 575,
          "id": 5,
          "features": {
            "ner": {
              "type": "PER",
              "score": 1,
              "source": "spacy",
              "spacy_model": "it_core_news_lg"
            },
            "linking": {
              "encoding": "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",
              "source": "blink_biencoder",
              "top_candidate": {
                "raw_score": 164.02212524414062,
                "id": 1133981,
                "wikipedia_id": 706635,
                "wikidata_qid": 87015,
                "redirects_to": -1,
                "title": "Aleksandr Val'terovič Litvinenko",
                "url": "https://it.wikipedia.org/wiki?curid=706635",
                "type_": null,
                "indexer": 130,
                "score": 120.51887512207031,
                "norm_score": 0.6667507953806332
              },
              "candidates": [
                {
                  "raw_score": 164.02212524414062,
                  "id": 1133981,
                  "wikipedia_id": 706635,
                  "wikidata_qid": 87015,
                  "redirects_to": -1,
                  "title": "Aleksandr Val'terovič Litvinenko",
                  "url": "https://it.wikipedia.org/wiki?curid=706635",
                  "type_": null,
                  "indexer": 130,
                  "score": 120.51887512207031,
                  "norm_score": 0.6667507953806332
                },
                {
                  "raw_score": 165.2196502685547,
                  "id": 1247637,
                  "wikipedia_id": 3562743,
                  "wikidata_qid": 3716778,
                  "redirects_to": -1,
                  "title": "Dušan Veličković",
                  "url": "https://it.wikipedia.org/wiki?curid=3562743",
                  "type_": null,
                  "indexer": 130,
                  "score": 119.92008972167969,
                  "norm_score": 0.6551877026463432
                },
                {
                  "raw_score": 165.29684448242188,
                  "id": 1322922,
                  "wikipedia_id": 126725,
                  "wikidata_qid": 295991,
                  "redirects_to": -1,
                  "title": "Aleksandr Vinokurov",
                  "url": "https://it.wikipedia.org/wiki?curid=126725",
                  "type_": null,
                  "indexer": 130,
                  "score": 119.88150024414062,
                  "norm_score": 0.6632246240121665
                },
                {
                  "raw_score": 165.89752197265625,
                  "id": 64214,
                  "wikipedia_id": 6175032,
                  "wikidata_qid": 27942176,
                  "redirects_to": -1,
                  "title": "Kyryll Bol'šakov",
                  "url": "https://it.wikipedia.org/wiki?curid=6175032",
                  "type_": null,
                  "indexer": 130,
                  "score": 119.58119201660156,
                  "norm_score": 0.6347112076663214
                },
                {
                  "raw_score": 166.26190185546875,
                  "id": 796136,
                  "wikipedia_id": 3218615,
                  "wikidata_qid": 370217,
                  "redirects_to": -1,
                  "title": "Dustin Moskovitz",
                  "url": "https://it.wikipedia.org/wiki?curid=3218615",
                  "type_": null,
                  "indexer": 130,
                  "score": 119.39897155761719,
                  "norm_score": 0.653185834630693
                },
                {
                  "raw_score": 166.65093994140625,
                  "id": 760101,
                  "wikipedia_id": 70512,
                  "wikidata_qid": 38823,
                  "redirects_to": -1,
                  "title": "Ruhollah Khomeyni",
                  "url": "https://it.wikipedia.org/wiki?curid=70512",
                  "type_": null,
                  "indexer": 130,
                  "score": 119.20449829101562,
                  "norm_score": 0.6594792223872084
                },
                {
                  "raw_score": 166.7532958984375,
                  "id": 1106627,
                  "wikipedia_id": 3297437,
                  "wikidata_qid": 471862,
                  "redirects_to": -1,
                  "title": "Semen Mohylevyč",
                  "url": "https://it.wikipedia.org/wiki?curid=3297437",
                  "type_": null,
                  "indexer": 130,
                  "score": 119.15325927734375,
                  "norm_score": 0.6591957509966428
                },
                {
                  "raw_score": 166.96080017089844,
                  "id": 508357,
                  "wikipedia_id": 8608517,
                  "wikidata_qid": 1320379,
                  "redirects_to": -1,
                  "title": "Aleksandr Vladimirovič Konovalov",
                  "url": "https://it.wikipedia.org/wiki?curid=8608517",
                  "type_": null,
                  "indexer": 130,
                  "score": 119.04954528808594,
                  "norm_score": 0.6586219704601111
                },
                {
                  "raw_score": 167.0239715576172,
                  "id": 219570,
                  "wikipedia_id": 251296,
                  "wikidata_qid": 204279,
                  "redirects_to": -1,
                  "title": "Goran Ivanišević",
                  "url": "https://it.wikipedia.org/wiki?curid=251296",
                  "type_": null,
                  "indexer": 130,
                  "score": 119.01797485351562,
                  "norm_score": 0.6341312757942078
                },
                {
                  "raw_score": 167.02548217773438,
                  "id": 555679,
                  "wikipedia_id": 2769112,
                  "wikidata_qid": 704422,
                  "redirects_to": -1,
                  "title": "Konstantin Muraviev",
                  "url": "https://it.wikipedia.org/wiki?curid=2769112",
                  "type_": null,
                  "indexer": 130,
                  "score": 119.01722717285156,
                  "norm_score": 0.6584431758188908
                }
              ],
              "nil_score": 0.14844179606512106,
              "is_nil": true
            },
            "cluster": 2
          }
        },
        {
          "type": "LOC",
          "start": 715,
          "end": 722,
          "id": 6,
          "features": {
            "ner": {
              "type": "LOC",
              "score": 1,
              "source": "spacy",
              "spacy_model": "it_core_news_lg"
            },
            "linking": {
              "encoding": "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",
              "source": "blink_biencoder",
              "top_candidate": {
                "raw_score": 113.43123626708984,
                "id": 1187290,
                "wikipedia_id": 28818,
                "wikidata_qid": 212,
                "redirects_to": -1,
                "title": "Ucraina",
                "url": "https://it.wikipedia.org/wiki?curid=28818",
                "type_": null,
                "indexer": 130,
                "score": 124.20376586914062,
                "norm_score": 0.7747970061464841
              },
              "candidates": [
                {
                  "raw_score": 113.43123626708984,
                  "id": 1187290,
                  "wikipedia_id": 28818,
                  "wikidata_qid": 212,
                  "redirects_to": -1,
                  "title": "Ucraina",
                  "url": "https://it.wikipedia.org/wiki?curid=28818",
                  "type_": null,
                  "indexer": 130,
                  "score": 124.20376586914062,
                  "norm_score": 0.7747970061464841
                },
                {
                  "raw_score": 121.49050903320312,
                  "id": 1048187,
                  "wikipedia_id": 31275,
                  "wikidata_qid": 1899,
                  "redirects_to": -1,
                  "title": "Kiev",
                  "url": "https://it.wikipedia.org/wiki?curid=31275",
                  "type_": null,
                  "indexer": 130,
                  "score": 120.17412567138672,
                  "norm_score": 0.7416969475300967
                },
                {
                  "raw_score": 121.84524536132812,
                  "id": 1333543,
                  "wikipedia_id": 2362505,
                  "wikidata_qid": 7835,
                  "redirects_to": -1,
                  "title": "Crimea",
                  "url": "https://it.wikipedia.org/wiki?curid=2362505",
                  "type_": null,
                  "indexer": 130,
                  "score": 119.99676513671875,
                  "norm_score": 0.758327016305642
                },
                {
                  "raw_score": 122.97760772705078,
                  "id": 999734,
                  "wikipedia_id": 9127617,
                  "wikidata_qid": 4499410,
                  "redirects_to": -1,
                  "title": "Olocausto in Ucraina",
                  "url": "https://it.wikipedia.org/wiki?curid=9127617",
                  "type_": null,
                  "indexer": 130,
                  "score": 119.4305648803711,
                  "norm_score": 0.7423671701482334
                },
                {
                  "raw_score": 124.263916015625,
                  "id": 1401572,
                  "wikipedia_id": 226910,
                  "wikidata_qid": 5118,
                  "redirects_to": -1,
                  "title": "Daghestan",
                  "url": "https://it.wikipedia.org/wiki?curid=226910",
                  "type_": null,
                  "indexer": 130,
                  "score": 118.78739929199219,
                  "norm_score": 0.737722200366247
                },
                {
                  "raw_score": 125.06437683105469,
                  "id": 654289,
                  "wikipedia_id": 614597,
                  "wikidata_qid": 133356,
                  "redirects_to": -1,
                  "title": "Repubblica Socialista Sovietica Ucraina",
                  "url": "https://it.wikipedia.org/wiki?curid=614597",
                  "type_": null,
                  "indexer": 130,
                  "score": 118.38719177246094,
                  "norm_score": 0.7450843600949663
                },
                {
                  "raw_score": 125.9910888671875,
                  "id": 1492219,
                  "wikipedia_id": 383895,
                  "wikidata_qid": 34266,
                  "redirects_to": -1,
                  "title": "Impero russo",
                  "url": "https://it.wikipedia.org/wiki?curid=383895",
                  "type_": null,
                  "indexer": 130,
                  "score": 117.923828125,
                  "norm_score": 0.745340309678627
                },
                {
                  "raw_score": 126.2405776977539,
                  "id": 868407,
                  "wikipedia_id": 2042155,
                  "wikidata_qid": 2078820,
                  "redirects_to": -1,
                  "title": "Repubblica Sovietica di Odessa",
                  "url": "https://it.wikipedia.org/wiki?curid=2042155",
                  "type_": null,
                  "indexer": 130,
                  "score": 117.7990951538086,
                  "norm_score": 0.7293426389955763
                },
                {
                  "raw_score": 126.243896484375,
                  "id": 217578,
                  "wikipedia_id": 276952,
                  "wikidata_qid": 45693,
                  "redirects_to": -1,
                  "title": "Agiaria",
                  "url": "https://it.wikipedia.org/wiki?curid=276952",
                  "type_": null,
                  "indexer": 130,
                  "score": 117.79740905761719,
                  "norm_score": 0.725309236546
                },
                {
                  "raw_score": 126.26410675048828,
                  "id": 1324327,
                  "wikipedia_id": 113081,
                  "wikidata_qid": 191607,
                  "redirects_to": -1,
                  "title": "Podolia",
                  "url": "https://it.wikipedia.org/wiki?curid=113081",
                  "type_": null,
                  "indexer": 130,
                  "score": 117.7873306274414,
                  "norm_score": 0.7433997363717315
                }
              ],
              "nil_score": 0.8625912612315062,
              "is_nil": false
            }
          }
        },
        {
          "type": "LOC",
          "start": 818,
          "end": 821,
          "id": 7,
          "features": {
            "ner": {
              "type": "LOC",
              "score": 1,
              "source": "spacy",
              "spacy_model": "it_core_news_lg"
            },
            "linking": {
              "encoding": "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",
              "source": "blink_biencoder",
              "top_candidate": {
                "raw_score": 132.4260711669922,
                "id": 1327098,
                "wikipedia_id": 2310527,
                "wikidata_qid": 11223,
                "redirects_to": -1,
                "title": "United States Air Force",
                "url": "https://it.wikipedia.org/wiki?curid=2310527",
                "type_": null,
                "indexer": 130,
                "score": 116.01671600341797,
                "norm_score": 0.720548933302257
              },
              "candidates": [
                {
                  "raw_score": 132.4260711669922,
                  "id": 1327098,
                  "wikipedia_id": 2310527,
                  "wikidata_qid": 11223,
                  "redirects_to": -1,
                  "title": "United States Air Force",
                  "url": "https://it.wikipedia.org/wiki?curid=2310527",
                  "type_": null,
                  "indexer": 130,
                  "score": 116.01671600341797,
                  "norm_score": 0.720548933302257
                },
                {
                  "raw_score": 134.39169311523438,
                  "id": 484098,
                  "wikipedia_id": 8262769,
                  "wikidata_qid": 55088961,
                  "redirects_to": -1,
                  "title": "United States Space Force",
                  "url": "https://it.wikipedia.org/wiki?curid=8262769",
                  "type_": null,
                  "indexer": 130,
                  "score": 115.03395080566406,
                  "norm_score": 0.7052412476736667
                },
                {
                  "raw_score": 136.0635986328125,
                  "id": 1160309,
                  "wikipedia_id": 1736632,
                  "wikidata_qid": 11211,
                  "redirects_to": -1,
                  "title": "United States Armed Forces",
                  "url": "https://it.wikipedia.org/wiki?curid=1736632",
                  "type_": null,
                  "indexer": 130,
                  "score": 114.19795227050781,
                  "norm_score": 0.716752314232975
                },
                {
                  "raw_score": 137.09397888183594,
                  "id": 1183806,
                  "wikipedia_id": 273,
                  "wikidata_qid": 49,
                  "redirects_to": -1,
                  "title": "America del Nord",
                  "url": "https://it.wikipedia.org/wiki?curid=273",
                  "type_": null,
                  "indexer": 130,
                  "score": 113.68281555175781,
                  "norm_score": 0.6924705901955658
                },
                {
                  "raw_score": 137.36578369140625,
                  "id": 213736,
                  "wikipedia_id": 285449,
                  "wikidata_qid": 11220,
                  "redirects_to": -1,
                  "title": "United States Navy",
                  "url": "https://it.wikipedia.org/wiki?curid=285449",
                  "type_": null,
                  "indexer": 130,
                  "score": 113.54683685302734,
                  "norm_score": 0.7121810832072478
                },
                {
                  "raw_score": 137.75140380859375,
                  "id": 213803,
                  "wikipedia_id": 285748,
                  "wikidata_qid": 9212,
                  "redirects_to": -1,
                  "title": "United States Army",
                  "url": "https://it.wikipedia.org/wiki?curid=285748",
                  "type_": null,
                  "indexer": 130,
                  "score": 113.35408020019531,
                  "norm_score": 0.7074826757199512
                },
                {
                  "raw_score": 137.76931762695312,
                  "id": 218391,
                  "wikipedia_id": 287866,
                  "wikidata_qid": 741723,
                  "redirects_to": -1,
                  "title": "United States Army Air Forces",
                  "url": "https://it.wikipedia.org/wiki?curid=287866",
                  "type_": null,
                  "indexer": 130,
                  "score": 113.34512329101562,
                  "norm_score": 0.6993186956815126
                },
                {
                  "raw_score": 137.83807373046875,
                  "id": 1393405,
                  "wikipedia_id": 200203,
                  "wikidata_qid": 2140008,
                  "redirects_to": -1,
                  "title": "United States Army Air Corps",
                  "url": "https://it.wikipedia.org/wiki?curid=200203",
                  "type_": null,
                  "indexer": 130,
                  "score": 113.31075286865234,
                  "norm_score": 0.6874945579865076
                },
                {
                  "raw_score": 137.88201904296875,
                  "id": 838574,
                  "wikipedia_id": 2638140,
                  "wikidata_qid": 910495,
                  "redirects_to": -1,
                  "title": "America russa",
                  "url": "https://it.wikipedia.org/wiki?curid=2638140",
                  "type_": null,
                  "indexer": 130,
                  "score": 113.28877258300781,
                  "norm_score": 0.7253777236116657
                },
                {
                  "raw_score": 138.33767700195312,
                  "id": 221930,
                  "wikipedia_id": 286147,
                  "wikidata_qid": 11218,
                  "redirects_to": -1,
                  "title": "United States Marine Corps",
                  "url": "https://it.wikipedia.org/wiki?curid=286147",
                  "type_": null,
                  "indexer": 130,
                  "score": 113.0609130859375,
                  "norm_score": 0.707491138130283
                }
              ],
              "nil_score": 0.0639900578901584,
              "is_nil": true
            },
            "cluster": 5
          }
        },
        {
          "type": "LOC",
          "start": 912,
          "end": 923,
          "id": 8,
          "features": {
            "ner": {
              "type": "LOC",
              "score": 1,
              "source": "spacy",
              "spacy_model": "it_core_news_lg"
            },
            "linking": {
              "encoding": "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",
              "source": "blink_biencoder",
              "top_candidate": {
                "raw_score": 126.08656311035156,
                "id": 484098,
                "wikipedia_id": 8262769,
                "wikidata_qid": 55088961,
                "redirects_to": -1,
                "title": "United States Space Force",
                "url": "https://it.wikipedia.org/wiki?curid=8262769",
                "type_": null,
                "indexer": 130,
                "score": 115.92566680908203,
                "norm_score": 0.7107081111728042
              },
              "candidates": [
                {
                  "raw_score": 126.08656311035156,
                  "id": 484098,
                  "wikipedia_id": 8262769,
                  "wikidata_qid": 55088961,
                  "redirects_to": -1,
                  "title": "United States Space Force",
                  "url": "https://it.wikipedia.org/wiki?curid=8262769",
                  "type_": null,
                  "indexer": 130,
                  "score": 115.92566680908203,
                  "norm_score": 0.7107081111728042
                },
                {
                  "raw_score": 126.565185546875,
                  "id": 1183806,
                  "wikipedia_id": 273,
                  "wikidata_qid": 49,
                  "redirects_to": -1,
                  "title": "America del Nord",
                  "url": "https://it.wikipedia.org/wiki?curid=273",
                  "type_": null,
                  "indexer": 130,
                  "score": 115.68630981445312,
                  "norm_score": 0.7046743770899044
                },
                {
                  "raw_score": 126.69888305664062,
                  "id": 1342488,
                  "wikipedia_id": 2386936,
                  "wikidata_qid": 650051,
                  "redirects_to": -1,
                  "title": "Bomba atomica",
                  "url": "https://it.wikipedia.org/wiki?curid=2386936",
                  "type_": null,
                  "indexer": 130,
                  "score": 115.61949157714844,
                  "norm_score": 0.71374640746018
                },
                {
                  "raw_score": 126.86219787597656,
                  "id": 213736,
                  "wikipedia_id": 285449,
                  "wikidata_qid": 11220,
                  "redirects_to": -1,
                  "title": "United States Navy",
                  "url": "https://it.wikipedia.org/wiki?curid=285449",
                  "type_": null,
                  "indexer": 130,
                  "score": 115.53783416748047,
                  "norm_score": 0.7246688870366519
                },
                {
                  "raw_score": 126.99098205566406,
                  "id": 544877,
                  "wikipedia_id": 2830276,
                  "wikidata_qid": 189062,
                  "redirects_to": -1,
                  "title": "Stati con armi nucleari",
                  "url": "https://it.wikipedia.org/wiki?curid=2830276",
                  "type_": null,
                  "indexer": 130,
                  "score": 115.47344970703125,
                  "norm_score": 0.7373833915662348
                },
                {
                  "raw_score": 127.93798065185547,
                  "id": 273733,
                  "wikipedia_id": 1323850,
                  "wikidata_qid": 856843,
                  "redirects_to": -1,
                  "title": "Stati Arabi Uniti",
                  "url": "https://it.wikipedia.org/wiki?curid=1323850",
                  "type_": null,
                  "indexer": 130,
                  "score": 114.99994659423828,
                  "norm_score": 0.7411462367098366
                },
                {
                  "raw_score": 128.02825927734375,
                  "id": 1332942,
                  "wikipedia_id": 2374056,
                  "wikidata_qid": 35525,
                  "redirects_to": -1,
                  "title": "Casa Bianca",
                  "url": "https://it.wikipedia.org/wiki?curid=2374056",
                  "type_": null,
                  "indexer": 130,
                  "score": 114.95479583740234,
                  "norm_score": 0.7257336784185011
                },
                {
                  "raw_score": 128.18536376953125,
                  "id": 506298,
                  "wikipedia_id": 8584298,
                  "wikidata_qid": 453521,
                  "redirects_to": -1,
                  "title": "Nuclear Threat Initiative",
                  "url": "https://it.wikipedia.org/wiki?curid=8584298",
                  "type_": null,
                  "indexer": 130,
                  "score": 114.87623596191406,
                  "norm_score": 0.7009183512342245
                },
                {
                  "raw_score": 128.2174835205078,
                  "id": 1327098,
                  "wikipedia_id": 2310527,
                  "wikidata_qid": 11223,
                  "redirects_to": -1,
                  "title": "United States Air Force",
                  "url": "https://it.wikipedia.org/wiki?curid=2310527",
                  "type_": null,
                  "indexer": 130,
                  "score": 114.86019897460938,
                  "norm_score": 0.7133661139624182
                },
                {
                  "raw_score": 128.58132934570312,
                  "id": 776886,
                  "wikipedia_id": 3260924,
                  "wikidata_qid": 1499604,
                  "redirects_to": -1,
                  "title": "USS United States (CVA-58)",
                  "url": "https://it.wikipedia.org/wiki?curid=3260924",
                  "type_": null,
                  "indexer": 130,
                  "score": 114.67827606201172,
                  "norm_score": 0.6800339730065457
                }
              ],
              "nil_score": 0.07268797043532209,
              "is_nil": true
            },
            "cluster": 1
          }
        },
        {
          "type": "LOC",
          "start": 990,
          "end": 993,
          "id": 9,
          "features": {
            "ner": {
              "type": "LOC",
              "score": 1,
              "source": "spacy",
              "spacy_model": "it_core_news_lg"
            },
            "linking": {
              "encoding": "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",
              "source": "blink_biencoder",
              "top_candidate": {
                "raw_score": 131.4644012451172,
                "id": 1327098,
                "wikipedia_id": 2310527,
                "wikidata_qid": 11223,
                "redirects_to": -1,
                "title": "United States Air Force",
                "url": "https://it.wikipedia.org/wiki?curid=2310527",
                "type_": null,
                "indexer": 130,
                "score": 117.5443115234375,
                "norm_score": 0.7300364223502572
              },
              "candidates": [
                {
                  "raw_score": 131.4644012451172,
                  "id": 1327098,
                  "wikipedia_id": 2310527,
                  "wikidata_qid": 11223,
                  "redirects_to": -1,
                  "title": "United States Air Force",
                  "url": "https://it.wikipedia.org/wiki?curid=2310527",
                  "type_": null,
                  "indexer": 130,
                  "score": 117.5443115234375,
                  "norm_score": 0.7300364223502572
                },
                {
                  "raw_score": 133.9192657470703,
                  "id": 484098,
                  "wikipedia_id": 8262769,
                  "wikidata_qid": 55088961,
                  "redirects_to": -1,
                  "title": "United States Space Force",
                  "url": "https://it.wikipedia.org/wiki?curid=8262769",
                  "type_": null,
                  "indexer": 130,
                  "score": 116.3169174194336,
                  "norm_score": 0.7131067601513442
                },
                {
                  "raw_score": 134.41018676757812,
                  "id": 1160309,
                  "wikipedia_id": 1736632,
                  "wikidata_qid": 11211,
                  "redirects_to": -1,
                  "title": "United States Armed Forces",
                  "url": "https://it.wikipedia.org/wiki?curid=1736632",
                  "type_": null,
                  "indexer": 130,
                  "score": 116.0714340209961,
                  "norm_score": 0.7285110397936129
                },
                {
                  "raw_score": 136.40567016601562,
                  "id": 218391,
                  "wikipedia_id": 287866,
                  "wikidata_qid": 741723,
                  "redirects_to": -1,
                  "title": "United States Army Air Forces",
                  "url": "https://it.wikipedia.org/wiki?curid=287866",
                  "type_": null,
                  "indexer": 130,
                  "score": 115.07369995117188,
                  "norm_score": 0.7099836977589491
                },
                {
                  "raw_score": 136.72842407226562,
                  "id": 1393405,
                  "wikipedia_id": 200203,
                  "wikidata_qid": 2140008,
                  "redirects_to": -1,
                  "title": "United States Army Air Corps",
                  "url": "https://it.wikipedia.org/wiki?curid=200203",
                  "type_": null,
                  "indexer": 130,
                  "score": 114.9123306274414,
                  "norm_score": 0.6972118704699579
                },
                {
                  "raw_score": 137.13558959960938,
                  "id": 213803,
                  "wikipedia_id": 285748,
                  "wikidata_qid": 9212,
                  "redirects_to": -1,
                  "title": "United States Army",
                  "url": "https://it.wikipedia.org/wiki?curid=285748",
                  "type_": null,
                  "indexer": 130,
                  "score": 114.70872497558594,
                  "norm_score": 0.7159374901267267
                },
                {
                  "raw_score": 137.2447967529297,
                  "id": 1312454,
                  "wikipedia_id": 115673,
                  "wikidata_qid": 128781,
                  "redirects_to": -1,
                  "title": "Wehrmacht",
                  "url": "https://it.wikipedia.org/wiki?curid=115673",
                  "type_": null,
                  "indexer": 130,
                  "score": 114.6541519165039,
                  "norm_score": 0.694596136290381
                },
                {
                  "raw_score": 138.1776580810547,
                  "id": 213736,
                  "wikipedia_id": 285449,
                  "wikidata_qid": 11220,
                  "redirects_to": -1,
                  "title": "United States Navy",
                  "url": "https://it.wikipedia.org/wiki?curid=285449",
                  "type_": null,
                  "indexer": 130,
                  "score": 114.18770599365234,
                  "norm_score": 0.7162007009386971
                },
                {
                  "raw_score": 138.30783081054688,
                  "id": 221930,
                  "wikipedia_id": 286147,
                  "wikidata_qid": 11218,
                  "redirects_to": -1,
                  "title": "United States Marine Corps",
                  "url": "https://it.wikipedia.org/wiki?curid=286147",
                  "type_": null,
                  "indexer": 130,
                  "score": 114.12261199951172,
                  "norm_score": 0.7141348362237643
                },
                {
                  "raw_score": 139.26968383789062,
                  "id": 838574,
                  "wikipedia_id": 2638140,
                  "wikidata_qid": 910495,
                  "redirects_to": -1,
                  "title": "America russa",
                  "url": "https://it.wikipedia.org/wiki?curid=2638140",
                  "type_": null,
                  "indexer": 130,
                  "score": 113.64165496826172,
                  "norm_score": 0.7276371974808047
                }
              ],
              "nil_score": 0.06673565499677057,
              "is_nil": true
            },
            "cluster": 5
          }
        },
        {
          "type": "LOC",
          "start": 1015,
          "end": 1021,
          "id": 10,
          "features": {
            "ner": {
              "type": "LOC",
              "score": 1,
              "source": "spacy",
              "spacy_model": "it_core_news_lg"
            },
            "linking": {
              "encoding": "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",
              "source": "blink_biencoder",
              "top_candidate": {
                "raw_score": 112.67544555664062,
                "id": 1492219,
                "wikipedia_id": 383895,
                "wikidata_qid": 34266,
                "redirects_to": -1,
                "title": "Impero russo",
                "url": "https://it.wikipedia.org/wiki?curid=383895",
                "type_": null,
                "indexer": 130,
                "score": 123.7557601928711,
                "norm_score": 0.7822011725136102
              },
              "candidates": [
                {
                  "raw_score": 112.67544555664062,
                  "id": 1492219,
                  "wikipedia_id": 383895,
                  "wikidata_qid": 34266,
                  "redirects_to": -1,
                  "title": "Impero russo",
                  "url": "https://it.wikipedia.org/wiki?curid=383895",
                  "type_": null,
                  "indexer": 130,
                  "score": 123.7557601928711,
                  "norm_score": 0.7822011725136102
                },
                {
                  "raw_score": 112.91564178466797,
                  "id": 1336211,
                  "wikipedia_id": 2378921,
                  "wikidata_qid": 159,
                  "redirects_to": -1,
                  "title": "Russia",
                  "url": "https://it.wikipedia.org/wiki?curid=2378921",
                  "type_": null,
                  "indexer": 130,
                  "score": 123.63567352294922,
                  "norm_score": 0.7829841764441392
                },
                {
                  "raw_score": 120.94129180908203,
                  "id": 1333543,
                  "wikipedia_id": 2362505,
                  "wikidata_qid": 7835,
                  "redirects_to": -1,
                  "title": "Crimea",
                  "url": "https://it.wikipedia.org/wiki?curid=2362505",
                  "type_": null,
                  "indexer": 130,
                  "score": 119.62284088134766,
                  "norm_score": 0.755963978730614
                },
                {
                  "raw_score": 120.95662689208984,
                  "id": 852553,
                  "wikipedia_id": 2734502,
                  "wikidata_qid": 186096,
                  "redirects_to": -1,
                  "title": "Regno russo",
                  "url": "https://it.wikipedia.org/wiki?curid=2734502",
                  "type_": null,
                  "indexer": 130,
                  "score": 119.61517333984375,
                  "norm_score": 0.7623367264723804
                },
                {
                  "raw_score": 121.25818634033203,
                  "id": 1186177,
                  "wikipedia_id": 591,
                  "wikidata_qid": 251395,
                  "redirects_to": -1,
                  "title": "Armata Rossa",
                  "url": "https://it.wikipedia.org/wiki?curid=591",
                  "type_": null,
                  "indexer": 130,
                  "score": 119.46440887451172,
                  "norm_score": 0.7340641711795532
                },
                {
                  "raw_score": 121.76544189453125,
                  "id": 1187637,
                  "wikipedia_id": 14200,
                  "wikidata_qid": 189266,
                  "redirects_to": -1,
                  "title": "Fronte orientale (1941-1945)",
                  "url": "https://it.wikipedia.org/wiki?curid=14200",
                  "type_": null,
                  "indexer": 130,
                  "score": 119.21076965332031,
                  "norm_score": 0.7406711145232839
                },
                {
                  "raw_score": 121.95782470703125,
                  "id": 1401572,
                  "wikipedia_id": 226910,
                  "wikidata_qid": 5118,
                  "redirects_to": -1,
                  "title": "Daghestan",
                  "url": "https://it.wikipedia.org/wiki?curid=226910",
                  "type_": null,
                  "indexer": 130,
                  "score": 119.11460876464844,
                  "norm_score": 0.7397543156712996
                },
                {
                  "raw_score": 122.06825256347656,
                  "id": 1384583,
                  "wikipedia_id": 153230,
                  "wikidata_qid": 190795,
                  "redirects_to": -1,
                  "title": "Roscosmos",
                  "url": "https://it.wikipedia.org/wiki?curid=153230",
                  "type_": null,
                  "indexer": 130,
                  "score": 119.05937194824219,
                  "norm_score": 0.7477177705098207
                },
                {
                  "raw_score": 122.3914794921875,
                  "id": 1185177,
                  "wikipedia_id": 4366,
                  "wikidata_qid": 15180,
                  "redirects_to": -1,
                  "title": "Unione Sovietica",
                  "url": "https://it.wikipedia.org/wiki?curid=4366",
                  "type_": null,
                  "indexer": 130,
                  "score": 118.89773559570312,
                  "norm_score": 0.7463523334049452
                },
                {
                  "raw_score": 123.57674407958984,
                  "id": 1308775,
                  "wikipedia_id": 122854,
                  "wikidata_qid": 5481,
                  "redirects_to": -1,
                  "title": "Tatarstan",
                  "url": "https://it.wikipedia.org/wiki?curid=122854",
                  "type_": null,
                  "indexer": 130,
                  "score": 118.30513000488281,
                  "norm_score": 0.7586704319281137
                }
              ],
              "nil_score": 0.08451374816628715,
              "is_nil": true
            },
            "cluster": 4
          }
        }
      ],
      "next_annid": 11
    }
  },
  "text": "Nell'ultima puntata di Non è l'arena, programma in onda la domenica sera su La7, si è parlato anche di armi nucleari. Un argomento attuale su cui è necessario essere chiari e che va trattato con estrema prudenza, visto che le conseguenze potrebbero essere tanto imprevedibili quanto drammatiche. In merito si è espresso il giornalista russo Vladimir Solovyev, che ha voluto fare una precisazione di grande rilievo: \"La Russia sa quando può usare l'arma nucleare. Lo strategico utilizzo è possibile solo quando ci sono esistenziali pericoli per il nostro Paese\".\n\nPoi Solovyev è stato ancora più netto e - senza ricorrere a giri di parole - ha tenuto a rassicurare che l'arma nucleare \"non può essere usata contro l'Ucraina\", in nessun modo. Infine è arrivata la precisazione che dà il segno di come i rapporti con gli Usa si stiano facendo sempre più pericolosi: l'arma nucleare potrebbe essere usata contro gli Stati Uniti, \"ma solo come risposta\". Questo vorrebbe dire che all'inizio gli Usa avrebbero colpito la Russia, che di seguito sarebbe chiamata a rispondere. \"In quel caso utilizzeremmo la nostra arma nucleare\", ha avvertito il giornalista russo.",
  "features": {
    "pipeline": [
      "spacyner",
      "biencoder",
      "indexer",
      "nilprediction",
      "nilclustering",
      "pipeline"
    ],
    "clusters": [
      {
        "title": "Vladimir Solovyev",
        "nelements": 1,
        "mentions_id": [
          2
        ],
        "mentions": [
          "Vladimir Solovyev"
        ],
        "center": "5oprPcCxUb0wbFS9ru0Hv0DzVjtIiaI+SKwSP5U/z755x7G/Q4SOP5Lu+z4UZXs+Ncy6Pi6nzT7/bBC+8l9SP6+TcT7Gyq49l4rIPe++Ir+iceo+i5M9v5bCqT7SPwe+fDTBPVXyGb+gX4M9NrGdvWv9Er7+5rE+ZVCeP6JmgT2cqyI8zttRP4s5/T19ijQ+EmE0PxzQkD7bJyq+8SdTPoi+fL8J/FE//g0xvSNPzz4P9gs/Tgf+vR1ZJr4ygxg+NOeTPuUG3L3JFFE+jPCuvfp9nz0x5fE9WCbhu3FsqD+ESCM+5uQCP00J0D6KNGQ9Hf9jP7xXjb8zAbY/1dxMP2jzTj/eymg/O/4KP7pTU78+n5e9lgaqP1CivLs88769jg6BvhYvvj2ZYDQ+w8OGvra/q75i9zS/NPc2vw5N2T0b8ZW+SHUbP8qTpL7Zy9i+hLjwvq4lgz95Q/e9oEudvmHMTz8H/jS+fMwzvRSniz5XwqS+ETlAvuSkMT5RdTG/gFVOP7/fu703iKY+Ds0hv+FwAr6IElC/ZJGUPlXIrL74xsk+bM3sPSVizD5+Eqm9K5iTv15Ot71Iv+m8SpwJP7Qgob7YOo4+VD0pPVWl57wgKRS/JgcSv7bIpD70vhc+/1mAvIx0eL5J/Lu++TP0PjIeBr/wRjw/hBwIPoiSxL5sxmC/HrlQP2Sysz1yCyq9AHACOtdFkr6RP6C/DK0Vv1MBBD8aZ54+Br+4vgzywj76/fa+4+DQvpht8b7kwGe+UMS5vwLzUL/o7YE++fv1vsRjRL4YZAM/DtRrv0FlZb7sNaC+bjnUveKSI77WwgM/l86kvo3SH77+ijs9RKiXvzXbvb5JsrG+5xQZv3dfpz6ni7W+xehpPw0NyT1wUPe+AMGqPoRi+76Cu4Y9yxPKPlwgHL9hATY+XlUAv/kljL/Qr869dkWHvtgOzL6y+PW+laAAv7JATz22dZY+SyKGvV/JhL3Y/Ek+S95WP2Ldib9lbzW+Qi8cvkujJz8uOY0+KTs3Py2pHr8N1Eu+DP+EvjpSVL/X1bW8DNuePpPESr9l6cg+/pu0vS0W2j6Xx4o80ueZPgbger4zJfG+qLWDPVSnTL2sNQc/G+1NvrAMhr5ST84/saxEP07FUT+kOhE/3u1SPyQLe795AJy9wMfNPukyLT85+zi+5Jb6vurBFL+LXmE9NCQIPywyzT6KW5M+OIgVPcapZr1ZGq6+0qB0vfNkBr2npuI+c81XPlIGYz7xFWu934VLPgHxS74mkKO+0JDSPmoKNT/5X8s9u1FMvw+4uD693I4+BlOzvqT4ob20nPG9XCDjPubKNz6I/OK8wDiOP24Flz6owbM9jsJHPxsiDL8wGtQ7icETPpFQNL+6xww/9QZyvuov2j6wR2K/A1xTP7bOxD75g5A+d+AAPSpt2T2878e9aguFPCrzD7+S7w6/31ALv2hNsr72GJG9k+CovsG2Xr3uIZg/60xDP0UY5z2jQCG+0o8bvvDMajxNddS9WGXVPgKpYT+0wnm+7VxnPja9kj6OlUm/wecXv+zVI780TqG+7HAqvyrpt74sgwu/x6LeveJkkT5qI3K/Vl4jPY15pL7AFSC9eoMeP5BUyb5aJcW+GNjvPqAHr76WWow+MeYVv0nXab6ymIM9ZwEOv0s/nz00EoQ+/G+aPJ1MLT7ym4y9aCoLv3RJBD/bLCi9sKNevjASgr2yB54+yHyIPhhtmL4U9RM+BzMtPiqSzz2Y840+IM+Lu67d+j1Iy/S9VUUHvobfur073Mo9QR2lPmVckz3AQYW/NrCLPqFdCD/RWJS+1mggPqSmbD/MWNM9yTglv0S5UL/F4TG8cSqrP5eDKD4bRuO+4LjHvvRHML5FAtg+K8auPD2GQz6UIIA9rMDvPjlYJD2ZABk+XCQHvKWzEbxPsMi+mz2ivtd2Ib+GXRa/y9OqPqHkOD91qzw9cPnNPvRK0r2BTHC+wwkav+iMVj77e3m+XrSBvrpWJr8cAUC/8z++wM7ZfD6m32i+L2YCP1gQEz7CcU29QN2zPsLHxr320Ug+85CQP2jVIz/JiJU/0HsGP8jtxrxr1TG+Okmpvo7SkD5BCLE+DKaAv7KS0D4GZoK+k//MvjgWZL3/UYM/Fs+CPmjxmjvOVBC/fDhEvXYvMT94N6a9zSsJvlh4az/VNvM+6EbcvrWaUz81n+s+8HGUPSv/i74Uwmg+vQdIv96gFz73O6a+0OhjPso0Eb5wDtk88zeEvzoKlz7FnhK9WFrdPown9r4MSxS+WsGHPuZcXb6/Jo09tRT7vu74SL7urC6/vJ42vhJcLD1cTrI8gaaKvjZpWz5p5XI+G+5bv7KaZb5CuOY+6riKvjozrD63Xmc/lvAfvouF7j0DLCE/FXg7PjjED78L0v49MfXGPvphPT86W8M9gJoWPumvJz+K2um9Dj+mv/PMLz7yrLi+CAJNPj3NBL5+nms/cgGBvUFU2D7LAOW+w4KhvvTdXD1EDSk+3cUfvzr1wT7Q9mq8qD6/viIok77PEpm+zMD+PMQP/73pE5G9sg4Zv+fm8T0ySjG/ddB0v18PaL7cNH8/aJLrPpY3Xb/6hfq+ZDG1vhibTz4KYXu+JHPYPQjPrb6EZes+UMymPAasCb+Yvdy+Os4Lv8F0tr2nKJg+TsgiPxuVHL84Kve8S31dvURMXT851yU/rUUUv+2sqD7QHA4/YjI3vsHVpr6mtw6/s3Q5v7ERp7+/qDo/3cAJvzrMyL5s95S+qPrgO54FAz2r3A4+8pwQv2a9Jb/Xuxu+7uk9P7IDpj39B6O/AZw7PXiOgr6zL9E+hZnqPVD4Qz/SY3w/qOIPvzNp/r4deAU/Y3ySv4tOnL47rZ++76DLvl9rkD73LiA/ON7lPhI7IL5Ua7Q+MGkDP/1HrD961ga+k+IWv2PQL78653e+tm2fvgQoAL/gv16+0Hujvv2By733nNc/DPnjvcL8Ej7a630+MOBUPnJeLD8EXfI84q8Gu5NxEz4SKOa+4IqgOxERdr9cnl++2O0Mvk1eRL5J6B8/9lX1PKk5Pr7SIPi+ugkkviVmpL+kAkU/CXEvv5zWFr/NojS/DolOvgv3L77oLR2//XqOPUGPZT51hq0/0kH7vVahmDwv/iC+cjpWPAZI/b5XppM+fzIMP038o77AzJU9DATePDJphr5jTAu/gb6+vbMfrb6Dj/C+r8xRPhVBgT152Bo/OpiWvcF5oD2sglY/b0h8v/oK8L1sNbe9coiPvhOYej9uEU8/4jaoPaqrtb3bQJy+npKxPmholL030do+pjfIvomwRT2/Csq+ska+Ow2w9b47voW+rsuFPlSxdr56w82+lgRBPQgIhT3EGLC+uPuAPq3NuD23SEm/OEMJvjQuAz5Dip++diWCv/1DQ79Rv4M/voQMPN4Go730DqW+OovdvpPygT5Ovp2+0eIuv7G2hT7YRAo+ScqIP+VzFD8IHCq+E+MkvrVe0b5efAA+kiL8vlosQL8y9Mc+mnWxPpym3b443Iu++hzNvQOcBj9g4Cm/61ynPooDFj9SYMU+09cVvxPOKj3xcke9yI2PPVIj6j7umsQ+Xb3GPg41Kb3U3sk94idBPxaQLz5BHsY+kwr2voCjw77Z4zQ/IJ3pPti2rD3rY8e+1MEgv2clhT9gFJK8y0DgPmea0b62uDi9qeJLPragjL0sUi8/1hNfv2gS9L77wim+fkNOvgboQj+48RU/EFh2PEbbEb9sRYA+2k4FPowmT75nNOs+RX2DPm7Fkz58W509+jUnP9DRjT4wxD6+kv8JPpIA8DyqIV+++mIVv9L/FD9DHF4+wcSKvlB3+T1Yiue+BhvSPOSlt77rMHg/G+zePjp6WL8nH4i/xAGqvdPjzb4o99A+xehrP/w1D782o6I/VRyrvYjkAD+Wu96+lNj+vlCHIr4GOHU+xg6JviF9R7+S1hm/Nnx8PnDxqrsEGv0+4HCAv/uSor4FFIa9SunMvs3iXj8NbQw/Mn2OvrVgBj+HU1W+ahGIPook/b7eIgO+6xcSPm0XAz8kjxs+gNsev8ZFe79fm1o/P0ldv9sIWr61Iq++"
      },
      {
        "title": "Stati Uniti",
        "nelements": 1,
        "mentions_id": [
          8
        ],
        "mentions": [
          "Stati Uniti"
        ],
        "center": "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"
      },
      {
        "title": "Solovyev",
        "nelements": 1,
        "mentions_id": [
          5
        ],
        "mentions": [
          "Solovyev"
        ],
        "center": "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"
      },
      {
        "title": "Paese",
        "nelements": 1,
        "mentions_id": [
          4
        ],
        "mentions": [
          "Paese"
        ],
        "center": "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"
      },
      {
        "title": "Russia",
        "nelements": 1,
        "mentions_id": [
          10
        ],
        "mentions": [
          "Russia"
        ],
        "center": "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"
      },
      {
        "title": "Usa",
        "nelements": 2,
        "mentions_id": [
          7,
          9
        ],
        "mentions": [
          "Usa",
          "Usa"
        ],
        "center": "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"
      }
    ]
  },
  "offset_type": "p",
  "name": ""
} as any;
