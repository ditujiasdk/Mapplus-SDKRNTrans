/*
 * @Author: xiezhiyan 16297996+xiezhiyan@users.noreply.github.com
 * @Date: 2026-04-09 17:05:08
 * @LastEditors: xiezhiyan 16297996+xiezhiyan@users.noreply.github.com
 * @LastEditTime: 2026-04-13 18:17:54
 * @FilePath: /RNTrans/android/app/src/main/java/com/testTransRN/NativeMainActivity.java
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
package com.testTransRN;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;
import com.supermap.rnwebmap.WebMapResource;

public class MainActivity extends AppCompatActivity {

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        WebMapResource.onActivityResult(requestCode, resultCode, data);
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_native_main);

        // 添加按钮点击事件
        Button btnGotoRN = findViewById(R.id.btn_goto_rn);
        btnGotoRN.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // 检查是否已经存在 RNActivity 实例
                RNActivity existingInstance = RNActivity.getInstance();
                if (existingInstance != null) {
                    // 如果存在，直接显示
                    Intent intent = new Intent(MainActivity.this, RNActivity.class);
                    intent.addFlags(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT);
                    startActivity(intent);
                } else {
                    // 如果不存在，创建新实例
                    Intent intent = new Intent(MainActivity.this, RNActivity.class);
                    startActivity(intent);
                }
            }
        });
    }
}
