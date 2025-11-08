# Testing Russian-to-English Translation

## Quick Start

1. **Start the development server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:5173/?view=ocr
   ```
   Or click on "OCR Test" from the home page.

## Testing Methods

### Method 1: Using OCR with Russian Text Image

1. **Prepare a Russian text image:**
   - Find or create an image with Russian text (Cyrillic characters)
   - Examples: Russian medical documents, prescription labels, or any image with Russian text
   - You can also create a simple image with text like: "Привет, как дела?"

2. **In the OCR interface:**
   - Select "Russian" (🇷🇺) as one of the languages
   - Upload your Russian text image
   - Click "Extract Text"
   - Wait for OCR to complete

3. **Test Translation:**
   - After text is extracted, you should see a "Translate to English" button
   - Click it to translate the Russian text
   - The translated text will appear below the original

### Method 2: Manual Text Input (Quick Test)

For quick testing without an image, you can temporarily add a test input field or use browser console:

1. **Open browser console** (F12 or Cmd+Option+I)
2. **Run this code:**
   ```javascript
   // Import the translation function (you'll need to expose it or test directly)
   // Or test via the UI by pasting Russian text
   ```

### Method 3: Test with Sample Russian Text

Here are some sample Russian phrases you can test with:

**Simple phrases:**
- `Привет, как дела?` → "Hello, how are you?"
- `Спасибо большое` → "Thank you very much"
- `Добро пожаловать` → "Welcome"

**Medical terms (relevant to your app):**
- `Пациент чувствует себя хорошо` → "The patient feels well"
- `Необходимо пройти обследование` → "It is necessary to undergo an examination"
- `Принимать лекарство три раза в день` → "Take the medicine three times a day"

**Longer text:**
```
Пациент жалуется на головную боль и тошноту. 
Температура тела повышена до 38 градусов. 
Рекомендуется постельный режим и обильное питье.
```

Expected translation:
```
The patient complains of headache and nausea. 
Body temperature is elevated to 38 degrees. 
Bed rest and plenty of fluids are recommended.
```

## Testing Features

### ✅ Test These Scenarios:

1. **Auto-translate checkbox:**
   - Enable "Auto-translate Russian to English" checkbox
   - Extract Russian text from an image
   - Translation should happen automatically

2. **Manual translation:**
   - Extract Russian text
   - Click "Translate to English" button
   - Verify translation appears

3. **Non-Russian text:**
   - Extract English text
   - "Translate to English" button should NOT appear
   - Or if it appears, clicking it should show an error

4. **Progress indicator:**
   - Watch the progress percentage during translation
   - First translation will be slower (model download)
   - Subsequent translations should be faster

5. **Copy functionality:**
   - Copy original text
   - Copy translated text
   - Both should work independently

6. **Error handling:**
   - Test with very long text
   - Test with mixed Russian/English text
   - Test with empty text

## First Run Notes

⚠️ **Important:** The first time you translate, the model will be downloaded (~50-100MB). This may take 30-60 seconds depending on your internet connection. Subsequent translations will be much faster as the model is cached in your browser.

You'll see progress indicators during:
- Model download (first time only)
- Translation processing

## Troubleshooting

### Model not loading?
- Check browser console for errors
- Ensure you have internet connection (for first-time model download)
- Check that `@xenova/transformers` is installed: `npm list @xenova/transformers`

### Translation not working?
- Verify the text contains Russian Cyrillic characters
- Check browser console for error messages
- Try refreshing the page and trying again

### Slow performance?
- First translation is always slower (model download)
- Large texts may take longer
- Check browser console for any warnings

## Browser Compatibility

The translation feature uses WebAssembly and should work in:
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari (may be slower)
- ❌ Older browsers may not support WebAssembly

