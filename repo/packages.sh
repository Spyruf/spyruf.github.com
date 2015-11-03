#!/bin/bash
dpkg-deb -bZgzip projects/com.spyruf.OVOZeppelinLogos debs
dpkg-deb -bZgzip projects/com.spyruf.SpyrufLionZeppelinLogo debs
dpkg-deb -bZgzip projects/com.spyruf.NoCCKnobs debs

#dpkg-deb -bZgzip projects/<package name> <output folder>
