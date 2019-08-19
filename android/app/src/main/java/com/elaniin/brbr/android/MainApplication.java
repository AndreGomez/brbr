package com.elaniin.brbr.android;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

//firebase
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
//message
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
//notifications
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

//react native splash screen
import org.devio.rn.splashscreen.SplashScreenReactPackage;

//react navigation
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

//image picker
import com.imagepicker.ImagePickerPackage;

//linear
import com.BV.LinearGradient.LinearGradientPackage;

//map
import com.airbnb.android.react.maps.MapsPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(), 
        new RNFirebasePackage(),
        new RNFirebaseStoragePackage(), 
        new SplashScreenReactPackage(), 
        new RNGestureHandlerPackage(),
        new ImagePickerPackage(),
        new MapsPackage(),
        new LinearGradientPackage(),
        new RNFirebaseMessagingPackage(),
        new RNFirebaseNotificationsPackage()
        );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
