package com.testTransRN.modules;
import com.facebook.fbreact.specs.NativeToolsModulesSpec;
import com.facebook.react.bridge.ReactApplicationContext;

import android.util.Log;
import android.app.Activity;

public class NativeHToolsModule extends NativeToolsModulesSpec {

    public NativeHToolsModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public void goBackWithParams(String params) {
        Log.d("test1111", "Received params from RN: " + params);
        final Activity activity = getCurrentActivity();
        if (activity != null) {
            activity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    // 打印参数
                    if (params != null) {
                        Log.d("test1111", "Received params from RN: " + params);
                    } else {
                        Log.d("test", "Received params from RN: {}");
                    }
                    activity.finish();
                }
            });
        }
    }
}
