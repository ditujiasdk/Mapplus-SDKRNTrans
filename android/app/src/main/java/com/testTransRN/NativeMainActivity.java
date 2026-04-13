package com.testTransRN;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;
import com.supermap.rnwebmap.WebMapResource;

public class NativeMainActivity extends AppCompatActivity {

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
                Intent intent = new Intent(NativeMainActivity.this, MainActivity.class);
                startActivity(intent);
            }
        });
    }
}
