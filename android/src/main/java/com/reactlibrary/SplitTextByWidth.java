package com.reactlibrary;

import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.Typeface;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;

public class SplitTextByWidth extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    private static final String TAG = "SplitTextByWidth";

    private final String KEY_FONT = "font";

    private final String KEY_FONT_SIZE = "fontSize";

    private final String KEY_WIDTH = "width";

    private final String KEY_HEIGHT = "height";

    public SplitTextByWidth(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "SplitTextByWidth";
    }


    @ReactMethod
    public void processString(String text, ReadableMap textConfig, ReadableMap textMax, Callback callback) {

        Paint paint = new Paint();
        Rect rect = new Rect();
        String font = textConfig.getString(KEY_FONT);
        int fontSize = textConfig.getInt(KEY_FONT_SIZE);
        int textWidth = textMax.getInt(KEY_WIDTH);
        String resultStr = "";

        paint.setTextSize(fontSize);
        paint.setTypeface(Typeface.create(font, Typeface.NORMAL));
        int start = 0;
        for (int i = 1; i<= text.length(); i++) {
            String subString = text.substring(start, i);
            paint.getTextBounds(subString, 0, subString.length(), rect);
            if (rect.width() > textWidth) {
                subString = text.substring(start, i);
                if(resultStr.length() == 0) {
                    resultStr += subString;
                } else {
                    resultStr += "," + subString;
                };
                start = i;
            } else {
                if (i == text.length()) {
                    subString = text.substring(start, i);
                    if(resultStr.length() == 0) {
                        resultStr += subString;
                    } else {
                        resultStr += "," + subString;
                    };
                }
            }
        }

        Log.d(TAG, "result=" + resultStr);
        if (callback != null) {
            callback.invoke(null, resultStr);
        }
    }
}
