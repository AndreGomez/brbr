## Paso 1

* Clonar el proyecto con la siguiente linea `git clone git@gitlab.com:marvintrejoxi/react-native-core.git nombre-de-tu-proyecto`
* `cd nombre-de-tu-proyecto`
* Set node version con el comando `nvm use 12.2.0`, si no tienes instalada esta version utilizar el comando `nvm install 12.2.0`
* Instalar node modulos con `yarn install`

## Paso 2
* Eliminar la carpeta **.git** con el comando `rm -rf .git`
* Eliminar el archivo CHANGELOG.md con el comando `rm -rf CHANGELOG.md && touch CHANGELOG.md`
* Eliminar archivo INSTALL.md con el comando `rm -rf INSTALL.md`
* Iniciar git con el comando `git init`

## Paso 3
* Instalar el paquete **react-native-rename** con el comando `npm install -g react-native-rename`
* Renombrar el proyecto con el siguiente comando `react-native-rename 'YOUR_PRODUCT_NAME' -b 'your.bundle.id'`

## Paso 4: Configuracion en ios
* Actualizar los pods con el comando `pod install` en la carpeta **ios**
* abrir Xcode y cambiar tu **bundle id** y **display name**
* Eliminar de la carpeta **ios/yourProjctName** el archivo **GoogleService** y sustituirlo por el de tu proyecto.
* Cambiar **ios/yourProjctName/Images.xcassets** la imagen por defecto para tu splash.

## Paso 5: Configuracion en android
* Sustituir el archivo **google-service.json** de la carpeta **android/app/** por el de tu proyecto
* En carpeta **androide/app/src/main/res/mipmap** sustituir la imagen por defecto del splash por la de tu proyecto
* En el archivo **android/app/src/main/java/tu/bundle/id/SplashActivity,** cambiar **la line 1** por el **bundle id** de tu proyecto
* Para modificar el splash de tu proyecto, abrir android studio y revisar los siguientes archivos:
  ```
    1- android/app/src/main/res/drawable/background_splash.xml
    2- android/app/src/main/res/layout/launch_screen.xml
    3- android/app/src/main/res/values/colors.xml
    4- android/app/src/main/res/values/styles.xml
  ```
* Cambiar el archivo `android/app/my-release-key.jsk` por la jsk de tu proyecto
* Configurar tu jsk en el archivo `android/gradle.properties`