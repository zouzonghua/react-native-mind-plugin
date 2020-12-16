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


public class TestLength extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    private static final String TAG = "TestLength";

    private final String KEY_FONT = "font";

    private final String KEY_FONT_SIZE = "fontSize";

    private final String KEY_WIDTH = "width";

    private final String KEY_HEIGHT = "height";

    public TestLength(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "TestLength";
    }

    @ReactMethod
    public void processString(String text, ReadableMap textConfig, ReadableMap textMax, Callback callback) {

        Log.d(TAG, "text=" + text);
        if (text == null) {
            callback.invoke("NullPointerException");
            return;
        }

        Paint paint = new Paint();
        Rect rect = new Rect();
        String font = textConfig.getString(KEY_FONT);
        int fontSize = textConfig.getInt(KEY_FONT_SIZE);
        int textMaxWidth = textMax.getInt(KEY_WIDTH);
        int textMaxHeight = textMax.getInt(KEY_HEIGHT);

        paint.setTextSize(fontSize);
        paint.setTypeface(Typeface.create(font, Typeface.NORMAL));
        Log.d(TAG, "paint=" + paint);
        paint.getTextBounds(text, 0, text.length(), rect);

        int width = rect.width();
        int height = rect.height();
        width = width < textMaxWidth ? width : textMaxWidth;
        height = height < textMaxHeight ? height : textMaxHeight;
        Log.d(TAG, "width=" + width + ", height=" + height);
        if(callback != null) {
          callback.invoke(null, width, height);
        }
    }
}
