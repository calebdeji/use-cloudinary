# use-cloudinary

> Hooks created to wrap core cloudinary features for the client

Check out our [Docs](https://use-cloudinary.netlify.app/) for a deeper dive!

[![NPM](https://img.shields.io/npm/v/use-cloudinary.svg)](https://www.npmjs.com/package/use-cloudinary) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-cloudinary
```

## useImage

```jsx
import { useImage } from 'use-cloudinary';


function Image({ publicId, transformations, width, height, cloudName alt }) {
  const { generateUrl, url, isLoading, isError, error } = useImage({ cloudName });

  React.useEffect(() => {
    // the `generateUrl` function will hook internally to the SDK and do a lot of the heavy lifting for generating your image url 
    generateUrl({
      publicId,
      transformations: {
        // by supplying height and width separately from the transformations object, 
        // we can use the height and width to dictate the size of the element AND the transformations
        height,
        width,
        // then we can spread the rest of the transformations in
        ...transformations

        /* 
          you'll also be getting these automatically attached from internals

          fetchFormat: 'auto',
          quality: 'auto',
          crop: 'scale'

        */
        
      }
    });
  }, [publicId, height, width, transformations]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>

  return (
    <img
      // we also have changed `data` to `url` to better describe what `generateUrl` gives us back and makes more sense to pass to `src`
      style={{ 
        height: `${height}px`, 
        width: `${width}px` 
      }}
      src={url}
      alt={alt}
    />
  )
}

// If you're delivering a bunch of Images on a view, the hooks also supports lazy-loading out of the box 🤯
function LazyLoadedImage({ publicId, transformations, width, height, cloudName, alt }) {
  const {
    generateUrl,
    blurredPlaceholderUrl,
    url,
    isError,
    error,
    ref,
    supportsLazyLoading,
    inView
  } = useImage({ cloudName });

  React.useEffect(() => {
    generateUrl({
      publicId,
      transformations: {
        width,
        height,
        ...transformations
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicId, height, width, transformations])

  if (isError) return <p>{error.message}</p>;

  return (
    <div
      ref={!supportsLazyLoading ? ref : undefined}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: `no-repeat url(${blurredPlaceholderUrl(publicId, width, height)})`
      }}>
      {inView || supportsLazyLoading ? (
        <img
          src={url}
          loading="lazy"
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
          alt="Lazy loaded"
        />
      ) : null}
    </div>
  )
}

function Main() {
  return (
    <Image
      publicId="test toasts"
      height={1200}
      width={600}
      cloudName="testing-hooks-upload"
      alt="Not lazy-loaded"
    />
    <LazyLoadedImage 
      publicId="test toasts"
      height={300}
      width={300}
      cloudName="testing-hooks-upload"
      alt="Lazy-loaded"
    />
  )
}
```

## useVideo

```jsx
import { useVideo } from 'use-cloudinary'

function Video({ publicId, transformations, width, height }) {
  const { generateUrl, url, isLoading, isError, error } = useImage({ cloudName: 'testing-hooks-upload' });

  React.useEffect(() => {
    // the `generateUrl` function will hook internally to the SDK and do a lot of the heavy lifting for generating your video url 
    generateUrl({
      publicId,
      transformations: {
        // by supplying height and width separately from the transformations object, 
        // we can use the height and width to dictate the size of the element AND the transformations
        height,
        width,
        // then we can spread the rest of the transformations in
        ...transformations

        /* 
          you'll also be getting these automatically attached from internals

          fetchFormat: 'auto',
          quality: 'auto',
          crop: 'scale'
        */        
      }
    });
  }, [publicId, height, width, transformations]);
  
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>

  return (
    <video style={{ height: `${height}px`, width: `${width}px` }} autoPlay controls>
      <source src={url} />
    </video>
  )
}

function Main() {
  return (
    <Video 
      publicId="trees" 
      height={300}
      width={400}
    />    
  )
}
```

## useGif

```jsx
import { useGif } from 'use-cloudinary'

function Gif({ publicId, transformations, width, height, alt  }) {
  const { generateUrl, url, isLoading, isError, error } = useImage({ cloudName: 'testing-hooks-upload' });

  React.useEffect(() => {
    // the `generateUrl` function will hook internally to the SDK and do a lot of the heavy lifting for generating your gif url 
    generateUrl({
      publicId,
      transformations: {
        // by supplying height and width separately from the transformations object, 
        // we can use the height and width to dictate the size of the element AND the transformations
        height,
        width,
        // then we can spread the rest of the transformations in
        ...transformations

        /* 
          you'll also be getting these automatically attached from internals

          fetchFormat: 'auto',
          quality: 'auto',
          crop: 'scale'
        */        
      }
    });
  }, [publicId, height, width, transformations]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>

   return (
     <img 
      src={data} 
      alt={alt}
      style={{ 
        height: `${height}px`, 
        width: `${width}px` 
      }}
    />
  )
}

function Main() {
  return (
    <Gif 
      publicId="trees" 
      height={300}
      width={400}
      alt="From video to Gif"
    />    
  )
}
```

## useAudio

```jsx
import { useAudio } from 'use-cloudinary';

function Audio({ publicId, transformations }) {
  const { generateUrl, url, isLoading, isError, error } = useImage({ cloudName: 'testing-hooks-upload' });

  React.useEffect(() => {
    // the `generateUrl` function will hook internally to the SDK and do a lot of the heavy lifting for generating your audio url 
    generateUrl({
      publicId,
      transformations                 
    });
  }, [publicId, transformations]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>

  return (
    <audio controls>
      <source src={url} type="audio/mp3" />
    </audio>
  )
}

function Main() {
  return <Audio publicId="game-sounds/switch" />;
}
```

## useUpload

Example of a serverless function you'd create 
```js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

exports.handler = (event) => {
  const res = await cloudinary.uploader.upload(file, { ...JSON.parse(event.body)})

  return {
    statusCode: 200,
    body: JSON.stringify(res)
  }
}
```
```jsx
import { useUpload } from 'use-cloudinary'

function SignedUpload({ file, uploadOptions }) {
  const {upload, data, isLoading, isError, error } = useUpload({ endpoint: "/your/endpoint" });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div>
      <input type="file" onChange={() => {
        // ...stuff to make sure your media is ready to upload 
        upload({
          file,
          uploadOptions 
        });
      }} />
      {data && <img src={data.url} />}
    </div>
  )
}

function UnsignedUpload({ file, uploadOptions }) {
  const {upload, data, isLoading, isError, error } = useUpload({ endpoint: "/your/endpoint" });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div>
      <input type="file" onChange={() => {
        // ...stuff to make sure your media is ready to upload 
        upload({
          file,
          // Unsigned uploads only allow for specific options outside of your upload preset
          uploadOptions,
          // the only difference for unsigned uploads are these two keys. these will inform a backend function on which function from the SDK to use
          unsigned: "true",
          uploadPreset: "upload-preset-1"
        });
      }} />
      {data && <img src={data.url} />}
    </div>
  )
}
```

## useSearch

Example of a serverless function you'd create 
(Guide coming soon 😅)
```js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const res = await cloudinary.search
    .expression(body.expression)
    .execute().then(result => result);
  return {
    statusCode: 200,
    body: JSON.stringify(res)
  }
}
```
```jsx
import Image from './Image';
import { useSearch } from 'use-cloudinary';

export default function Images({ endpoint }) {
  const { search, data, isLoading, isError, error } = useSearch({ endpoint: endpoint });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>

  return (
    <div>

      <button onClick={() => {
        // search will accept options such as resourceType, publicId, tags, folder, and aspectRatio 
        // this will return us all assets that are an image resource type
        return search({ resourceType: "image"})
      }}>
        Load
      </button>
      <div>
        {
          data && data.resources.map(image => (
            <Image 
              publicId={image.public_id} 
              transformations={{ 
                height: 0.2, 
                border: "2px_solid_black" 
              }} 
              cloudName="testing-hooks-upload"
            />
          )}
      </div>
    </div >
  )
}
```

## useCloudinary 

```jsx
import { useCloudinary } from 'use-cloudinary';

export default function useTransforms() {
  // here we utilize the bare cloudinary SDK object and use it to chain transformations
  const { cloudinaryCore } = useCloudinary();

  const addTextLayer = ({
    fontFamily,
    fontSize,
    text,
    gravity,
    x,
    y,
    lineSpacing,
    fontWeight
  }) => {
    return [
      {
        overlay: new cloudinaryCore.TextLayer()
          .fontFamily(fontFamily || "Times")
          .fontSize(fontSize || 32)
          .text(text || '')
          .fontWeight(fontWeight || "semibold")
          .lineSpacing(lineSpacing || -10),
        gravity: gravity || 'center',
        x: x || 0,
        y: y || 0
      }
    ]
  }

  const addTextTagsLogo = ({ text, tags, logo, logoGravity }) => {
    return [
      { border: '4px_solid_black' },
      // generate the title
      {
        overlay: new cloudinaryCore.TextLayer().fontFamily(text.fontFamily || "Times").fontSize(text.fontSize || 32).text(text.text || ''),
        gravity: text.gravity || 'center',
        x: text.x || 0,
        y: text.y || 0
      },
      // generate subtext
      {
        overlay: new cloudinaryCore.TextLayer().fontFamily(tags.fontFamily || "Times").fontSize(tags.fontSize || 16).text(tags.text || ''),
        gravity: tags.gravity || 'center',
        y: 50
      },
      // grab and place the logo from cloudinary 
      {
        overlay: logo === true ? new cloudinaryCore.Layer().publicId('logo') : '',
        gravity: logoGravity || "center",
        y: 100
      },
    ]
  }

  return {
    addTextLayer,
    addTextTagsLogo
  }
}
```


## License

MIT © [domitriusclark](https://github.com/domitriusclark)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
