export const INPUT: string = `132
146
153
175
180
160
154
160
161
160
161
169
161
164
166
196
193
199
198
208
209
211
223
226
224
225
227
230
229
242
241
246
243
245
286
285
284
267
274
275
267
295
296
302
304
305
281
287
293
295
290
285
286
285
287
289
283
289
295
305
304
315
317
334
338
342
337
338
341
340
352
360
341
346
349
350
352
351
356
357
385
379
362
347
349
352
368
372
356
354
353
365
362
372
373
376
377
381
375
368
375
373
369
370
376
377
376
381
389
388
394
387
395
384
381
387
390
384
394
370
368
374
403
402
403
404
405
417
440
439
441
466
468
469
466
453
465
463
444
443
447
448
468
492
501
503
505
506
508
533
535
515
521
520
521
537
538
544
542
541
558
552
559
561
560
574
571
569
568
574
584
612
597
596
618
619
611
627
653
666
695
716
711
706
712
718
719
724
723
727
730
740
738
736
717
699
700
690
694
697
687
688
715
700
705
708
709
707
708
709
724
733
694
690
668
667
666
671
675
674
670
671
674
684
683
684
689
694
698
700
701
683
668
654
658
664
672
674
679
681
682
689
675
665
663
647
650
662
674
675
670
671
703
704
712
713
712
714
722
713
714
715
728
723
724
740
743
747
753
755
763
754
743
750
761
763
764
765
766
768
792
793
799
798
799
784
791
787
788
789
808
804
808
829
828
846
842
850
851
852
853
847
860
861
860
868
866
874
868
866
871
873
878
879
876
874
857
859
858
856
835
834
835
837
833
802
795
796
786
792
791
812
817
820
821
822
837
839
852
858
884
891
910
909
912
914
915
930
935
937
938
939
940
933
928
926
924
929
930
937
939
940
937
940
942
935
927
907
874
846
853
857
862
860
862
865
867
871
869
872
873
868
874
866
873
882
863
864
865
861
863
859
858
870
874
856
855
846
848
847
848
861
851
862
864
869
875
872
871
879
888
877
844
861
863
883
884
877
875
877
878
879
883
882
897
913
888
886
888
899
895
900
898
921
922
920
921
925
943
938
937
934
923
924
931
938
939
930
925
928
931
940
961
965
966
968
966
965
971
972
974
973
974
972
991
993
992
993
996
990
993
994
998
999
987
989
1007
1027
1033
1028
1029
1030
1033
1038
1037
996
999
997
999
1008
1039
1037
1063
1080
1085
1057
1060
1066
1067
1066
1067
1062
1064
1065
1068
1064
1072
1068
1062
1065
1077
1076
1077
1088
1097
1098
1102
1117
1092
1103
1100
1101
1100
1136
1131
1133
1132
1130
1122
1128
1136
1143
1149
1148
1149
1148
1146
1157
1159
1161
1178
1181
1180
1179
1197
1195
1198
1196
1214
1212
1225
1226
1244
1246
1248
1245
1246
1251
1253
1256
1261
1264
1296
1297
1298
1303
1328
1321
1315
1314
1315
1317
1287
1284
1291
1310
1311
1297
1298
1306
1308
1311
1308
1309
1318
1328
1326
1319
1337
1327
1332
1327
1326
1332
1348
1349
1359
1358
1354
1346
1366
1344
1356
1369
1382
1376
1349
1351
1361
1369
1390
1391
1400
1399
1400
1423
1428
1427
1455
1456
1424
1425
1420
1422
1423
1414
1412
1413
1422
1424
1419
1397
1401
1404
1407
1405
1403
1407
1401
1404
1401
1412
1410
1409
1408
1388
1379
1389
1388
1383
1384
1380
1381
1382
1380
1383
1368
1370
1357
1344
1346
1343
1333
1345
1346
1372
1366
1369
1368
1369
1382
1385
1386
1365
1366
1368
1370
1373
1364
1361
1370
1376
1371
1376
1381
1384
1385
1386
1411
1410
1417
1421
1418
1425
1429
1422
1428
1449
1463
1460
1456
1457
1493
1492
1493
1494
1496
1519
1520
1515
1507
1510
1506
1505
1504
1506
1516
1517
1520
1514
1472
1473
1480
1502
1503
1470
1472
1473
1468
1477
1464
1463
1452
1456
1453
1454
1444
1452
1451
1456
1476
1477
1471
1473
1502
1507
1517
1519
1522
1542
1547
1544
1552
1551
1552
1564
1536
1540
1538
1540
1523
1524
1525
1519
1517
1513
1534
1530
1536
1551
1563
1582
1584
1612
1619
1618
1648
1647
1634
1636
1656
1657
1659
1683
1684
1692
1691
1693
1695
1686
1690
1696
1719
1721
1724
1736
1723
1725
1755
1765
1784
1771
1770
1773
1771
1789
1786
1798
1800
1801
1806
1807
1808
1814
1815
1814
1815
1807
1816
1820
1835
1842
1846
1821
1822
1824
1825
1826
1825
1826
1834
1842
1843
1835
1847
1845
1828
1857
1859
1831
1833
1832
1837
1836
1849
1858
1849
1851
1847
1851
1844
1881
1868
1869
1882
1876
1878
1879
1880
1885
1886
1891
1890
1908
1909
1908
1895
1896
1891
1893
1888
1901
1926
1917
1945
1944
1943
1958
1944
1946
1951
1942
1940
1938
1936
1935
1925
1948
1957
1961
1956
1968
1980
2004
2017
2018
2022
2026
2004
2007
2003
2006
2003
2004
2003
2013
2006
2008
2007
2010
2023
2024
2020
2021
2024
2043
2039
2027
2026
2018
2020
2011
2012
2011
2007
2025
2040
2037
2034
2037
2045
2056
2082
2084
2103
2127
2124
2125
2124
2137
2144
2137
2120
2119
2125
2108
2102
2098
2065
2084
2085
2091
2086
2091
2104
2118
2104
2129
2133
2134
2136
2141
2154
2170
2173
2186
2183
2182
2188
2214
2217
2215
2214
2226
2231
2232
2226
2227
2233
2229
2220
2217
2230
2236
2239
2240
2245
2278
2305
2306
2312
2300
2298
2303
2302
2306
2305
2304
2311
2304
2301
2302
2274
2269
2280
2272
2271
2276
2283
2285
2286
2284
2283
2276
2269
2267
2270
2272
2262
2268
2281
2276
2280
2281
2291
2312
2338
2341
2342
2354
2355
2354
2337
2317
2321
2322
2321
2316
2318
2319
2313
2324
2322
2327
2326
2331
2332
2336
2318
2321
2323
2326
2325
2334
2341
2343
2346
2342
2347
2346
2351
2359
2363
2364
2351
2344
2346
2340
2341
2345
2352
2343
2344
2345
2342
2334
2339
2344
2354
2346
2357
2358
2364
2370
2371
2369
2386
2387
2381
2382
2376
2392
2388
2398
2399
2398
2420
2443
2437
2438
2466
2482
2486
2488
2486
2485
2486
2502
2503
2496
2497
2499
2500
2485
2491
2487
2482
2490
2489
2490
2494
2495
2496
2495
2482
2476
2459
2460
2483
2484
2483
2486
2490
2491
2488
2489
2488
2482
2484
2460
2476
2481
2482
2504
2508
2517
2522
2524
2531
2534
2537
2551
2557
2551
2544
2560
2559
2591
2592
2594
2595
2598
2601
2581
2586
2591
2593
2582
2591
2590
2571
2572
2569
2570
2548
2566
2567
2569
2571
2567
2566
2572
2575
2572
2577
2559
2550
2546
2541
2537
2536
2535
2539
2527
2514
2516
2517
2516
2517
2516
2526
2521
2523
2528
2529
2522
2511
2510
2541
2566
2572
2576
2578
2577
2572
2566
2563
2567
2580
2582
2583
2605
2600
2602
2606
2605
2604
2605
2604
2636
2646
2661
2659
2663
2664
2663
2669
2672
2649
2651
2642
2649
2622
2626
2633
2653
2655
2657
2656
2666
2670
2657
2659
2657
2654
2655
2665
2664
2668
2671
2672
2675
2684
2679
2680
2679
2670
2671
2677
2678
2679
2681
2700
2704
2699
2700
2701
2715
2713
2719
2710
2709
2721
2725
2732
2729
2739
2735
2736
2738
2744
2727
2739
2740
2742
2737
2734
2738
2737
2736
2755
2740
2741
2756
2751
2762
2765
2774
2752
2753
2772
2766
2762
2763
2767
2769
2770
2772
2782
2780
2783
2790
2791
2792
2785
2778
2773
2780
2787
2789
2798
2800
2796
2797
2814
2817
2818
2807
2795
2793
2794
2818
2819
2818
2819
2821
2820
2828
2822
2819
2832
2868
2848
2850
2844
2854
2855
2852
2835
2836
2837
2840
2867
2869
2878
2879
2884
2926
2927
2928
2931
2933
2939
2971
2973
2979
2974
2971
2978
2972
2973
2960
2974
2991
2980
2979
2978
2987
2992
3008
3007
2982
2971
2979
2972
2977
2962
2976
2972
2973
2974
2986
2996
2994
3018
3017
3022
3023
3019
3020
3023
3029
3040
3080
3076
3069
3071
3069
3037
3041
3047
3070
3071
3079
3087
3088
3087
3082
3085
3086
3089
3105
3073
3072
3071
3077
3103
3107
3114
3101
3100
3087
3096
3099
3111
3112
3116
3134
3153
3182
3198
3202
3231
3265
3262
3259
3263
3238
3242
3244
3243
3247
3248
3236
3235
3241
3213
3203
3209
3231
3228
3231
3232
3235
3238
3252
3256
3260
3259
3260
3255
3250
3245
3234
3264
3270
3277
3273
3279
3280
3282
3286
3292
3328
3329
3332
3324
3332
3334
3342
3351
3360
3365
3381
3375
3378
3379
3375
3373
3377
3389
3392
3394
3395
3399
3402
3415
3418
3419
3438
3457
3458
3459
3472
3471
3467
3472
3481
3484
3490
3518
3511
3512
3514
3512
3514
3512
3513
3511
3500
3499
3507
3511
3515
3533
3534
3535
3539
3541
3539
3532
3533
3531
3545
3548
3547
3553
3543
3514
3493
3490
3487
3488
3491
3492
3494
3495
3476
3509
3510
3511
3513
3514
3513
3510
3515
3532
3540
3541
3533
3539
3540
3538
3539
3535
3522
3523
3527
3520
3526
3527
3529
3536
3546
3547
3551
3552
3554
3564
3547
3548
3553
3548
3543
3542
3532
3535
3539
3538
3553
3552
3555
3565
3568
3578
3571
3577
3587
3589
3599
3625
3626
3620
3610
3597
3598
3589
3588
3587
3589
3592
3593
3604
3605
3582
3593
3604
3608
3607
3604
3603
3613
3606
3605
3612
3617
3618
3622
3620
3609
3596
3597
3588
3606
3607
3628
3624
3626
3624
3623
3630
3635
3636
3631
3632
3634
3635
3669
3667
3660
3659
3685
3681
3696
3697
3726
3732
3733
3719
3709
3708
3709
3715
3716
3717
3711
3716
3715
3745
3748
3757
3759
3761
3759
3760
3766
3767
3771
3775
3767
3774
3756
3757
3759
3760
3762
3779
3743
3745
3739
3736
3749
3741
3742
3755
3756
3760
3763
3765
3779
3784
3782
3785
3783
3782
3785
3788
3790
3770
3771
3774
3799
3795
3796
3804
3816
3864
3868
3853
3854
3855
3856
3851
3836
3833
3840
3835
3837
3858
3878
3879
3907
3912
3911
3914
3913
3934
3935
3952
3964
3979
4001
3998
3999
4001
4004
3994
3992
3990
3978
3977
3960
3966
3965
3960
3969
3970
3978
3976
3977
3976
3973
3985
3991
4027
4024
4032
4037
4042
4051
4042
4043
4035
4028
4022
4024
4025
4024
4039
4037
4057
4056
4058
4061
4066
4064
4063
4066
4065
4066
4069
4072
4070
4072
4071
4069
4071
4038
4039
4038
4037
4033
4034
4030
4026
4025
4028
4042
4057
4055
4056
4055
4056
4029
4060
4059
4062
4054
4059
4060
4061
4068
4078
4079
4090
4088
4089
4096
4094
4091
4068
4055
4056
4053
4037
4034
4035
4070
4071
4052
4047
4042
4060
4047
4063
4065
4066
4069
4075
4089
4086
4091
4093
4096
4104
4107
4105
4123
4133
4135
4144
4158
4182
4173
4172
4176
4175
4176
4174
4175
4183
4184
4183
4182
4177
4183
4182
4184
4181
4182
4191
4222
4254
4253
4254
4257
4271
4262
4265
4267
4271
4268
4278
4290
4294
4286
4288
4292
4286
4321
4320
4321
4318
4321
4320
4314
4312
4303
4297
4296
4269
4270
4254
4255
4254
4239
4251
4259
4276
4288
4269
4270
4271
4272
4280
4290
4291
4293
4297
4296
4312
4325
4327
4326
4327
4330
4341
4336
4342
4357
4366
4367
4374
4386
4389
4398
4397
4408
4423
4447
4443
4448
4447
4448
4447
4448
4458
4464
4463
4469
4468
4471
4472
4473
4477
4449
4445
4436
4437
4442
4446
4450
4453
4452
4456
4462
4460
4465
4473
4474`;
