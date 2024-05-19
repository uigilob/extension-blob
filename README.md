#  `$blob

The `$blob` function dynamically generates and processes a Blob object from data specified in an HTML element's attributes. It then creates a downloadable link for the generated Blob. This function is versatile, handling JSON and plain text data, and optionally applies a URL to the element or triggers a download.

#### Function Signature

```javascript
function $blob(target, scoop = {})
```

- **`target`**: The HTML element that triggers the Blob generation.
- **`scoop`** (optional): An object containing dynamic values for placeholder replacement in the data.

### Attributes for `target` Element

- **`blob-t`**: Selector for an element containing data to be converted to a Blob. Defaults to the `target` element if not provided.
- **`blob-typ`**: MIME type of the Blob. Defaults to `"text/plain"`.
- **`blob-data`**: Data to be converted to a Blob. This can contain placeholders starting with `$`.
- **`blob-name`**: Filename for the downloaded Blob.
- **`blob-url-t`**: Determines how the URL is applied. If set to `"apply"`, the function sets the `href` and `download` attributes of the element to create a link. If set to `"url"`, it only sets the `href` attribute. Otherwise, it triggers a download directly.
- **`blob-swap`**: Attribute containing the name of the property (`textContent`, `innerHTML`, etc.) from which to extract data if `blob-data` is not provided.

The `blob-if` attribute specifies the event that triggers the Blob creation and download. Below are the available options:

 **`void`**: The Blob is created and processed immediately when the script runs.
** OR MORE eVENTS Exmaple ,click....***

### Examples

### smaple 

```html
<button class="button"
     blob-typ="text/plain"
     blob-data="Exmaple a text file"
     blob-name="simpal.text"
     blob-if="void">
    Download Text
</button>
```


#### Example 1: JSON Download with Dynamic Values

HTML:
```html
<script>
    var dynamic = "hello";
    var id = 2;
</script>

<button class="button"
    blob-typ="application/json"
    blob-data='{
        "example": [1, 2, 3],
        "example2": "2",
        "example3": "$dynamic",
        "id": "$id"
    }'
    blob-name="hello.json"
    blob-if="click">
    Download hello.json
</button>
```

#### Example 2: Text Download with InnerHTML Data

HTML:
```html
<div id="content" 
     blob-typ="text/plain"
     blob-swap="innerHTML"
     blob-name="content.txt"
    >
    <p>This is some text content.</p>
</div>
<button class="button"
    blob-t="#content"
    blob-if="click">
    Download Text
</button>
```

#### Example 3: Applying URL to an Anchor Element

HTML:
```html
<script>
    var dynamic = "hello";
    var id = 2;
</script>

<a id="downloadLink"
    blob-typ="application/json"
    blob-data='{
        "example": [1, 2, 3],
        "example2": "2",
        "example3": "$dynamic",
        "id": "$id"
    }'
    blob-name="hello.json"
    blob-url-t="apply">
    Prepare JSON Download
</a>
<button id="prepareButton">Prepare Download</button>
```

### Usage

1. **Data Extraction**:
    - Retrieves the data from `blob-data` or `blob-swap` attributes.
2. **Placeholder Replacement**:
    - Replaces placeholders (e.g., `$dynamic`) in the data with corresponding values from `scoop` or the current scope.
3. **Content Type Handling**:
    - If `blob-typ` is `"application/json"`, ensures the data is valid JSON and pretty-prints it.
4. **Blob Creation and URL Handling**:
    - Creates a Blob from the data.
    - Depending on the value of `blob-url-t`, either applies the URL to the element or triggers a download.
