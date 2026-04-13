/*
 * @Author: xiezhiyan 16297996+xiezhiyan@users.noreply.github.com
 * @Date: 2026-04-09 17:06:45
 * @LastEditors: xiezhiyan 16297996+xiezhiyan@users.noreply.github.com
 * @LastEditTime: 2026-04-13 18:29:09
 * @FilePath: /RNTrans/android/app/src/main/java/com/testTransRN/modules/NativeHToolsModule.java
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package com.testTransRN.modules;
import com.facebook.fbreact.specs.NativeToolsModulesSpec;
import com.facebook.react.bridge.ReactApplicationContext;
import com.testTransRN.MainActivity;

import android.util.Log;
import android.app.Activity;
import android.content.Intent;

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
                    // 启动原生主页面，并添加返回动画效果
                    Intent intent = new Intent(activity, MainActivity.class);
                    intent.addFlags(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT);
                    activity.startActivity(intent);
                    // 添加返回动画：从左向右滑动
                    activity.overridePendingTransition(android.R.anim.slide_in_left, android.R.anim.slide_out_right);
                }
            });
        }
    }
}
