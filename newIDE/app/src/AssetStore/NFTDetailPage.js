// @flow
import { t, Trans } from '@lingui/macro';
import React, { useState } from 'react';
import {
  type ChooseResourceOptions,
  type ResourceSourceComponentProps,
  type ResourceSource,
  allResourceKindsAndMetadata,
} from '../ResourcesList/ResourceSource';
import { action } from '@storybook/addon-actions';
import { ResourceStore } from './ResourceStore/index.js';
import path from 'path-browserify';
import { useDebounce } from '../Utils/UseDebounce.js';
import Axios from 'axios';
import { ColumnStackLayout, TextFieldWithButtonLayout } from '../UI/Layout.js';
import { Line } from '../UI/Grid.js';
import RaisedButton from '../UI/RaisedButton.js';
import AlertMessage from '../UI/AlertMessage.js';
import {
  extractDecodedFilenameWithExtensionFromPublicAssetResourceUrl,
  isPublicAssetResourceUrl,
} from '../Utils/GDevelopServices/Asset.js';
import { Default } from '../stories/componentStories/UrlChooser.stories.js';
import SemiControlledTextField from '../UI/SemiControlledTextField.js';

type ResourceStoreChooserProps = {
  options: ChooseResourceOptions,
  onChooseResources: (resources: Array<gdResource>) => void,
  createNewResource: () => gdResource,
};

export type NFTDetailHeader = {|
  name: string,
  image: string,
  description: string,
  price: string,
  tokenId: string,
  seller: string,
  owner: string,
  tokenURI: string,
|};

type NftDetailChooserProps = {
  nft: NFTDetailHeader,
  onClose: () => void,
};

const NFTDetailPage = ({ nft, onClose }: NftDetailChooserProps) => {
  const external_url = 'https://gateway.pinata.cloud/';
  const gd: libGDevelop = global.gd;
  const ResourceStoreChooser = ({
    options,
    onChooseResources,
    createNewResource,
  }: ResourceStoreChooserProps) => {
    return (
      // Gola-Import: ResourceStore
      <ResourceStore
        onChoose={resource => {
          const chosenResourceUrl = resource.url;
          const newResource = createNewResource();
          newResource.setFile(chosenResourceUrl);
          const resourceCleanedName = isPublicAssetResourceUrl(
            chosenResourceUrl
          )
            ? extractDecodedFilenameWithExtensionFromPublicAssetResourceUrl(
                chosenResourceUrl
              )
            : path.basename(chosenResourceUrl);
          newResource.setName(resourceCleanedName);
          newResource.setOrigin('gdevelop-asset-store', chosenResourceUrl);

          onChooseResources([newResource]);
        }}
        resourceKind={options.resourceKind}
      />
    );
  };

  // const UrlChooser = ({
  //   options,
  //   onChooseResources,
  //   createNewResource,
  // }: ResourceStoreChooserProps) => {
  //   // const [inputValue, setInputValue] = React.useState('');
  //   const inputValue = external_url + nft.image;
  //   console.log('inputValue', inputValue);
  //   const [error, setError] = useState<?Error>(null);
  //   const [urlsErroredBooleanArray, setUrlsErroredBooleanArray] = useState<
  //     boolean[]
  //   >([]);
  //   const hasErroredUrls = !!urlsErroredBooleanArray.filter(Boolean).length;

  //   const validateInputValue = useDebounce(async (inputValue: string) => {
  //     const urls = options.multiSelection
  //       ? inputValue.split('\n').filter(Boolean)
  //       : [inputValue];
  //     console.log('Urls', urls);
  //     setError(null);
  //     setUrlsErroredBooleanArray([]);

  //     try {
  //       const responses = await Promise.all(
  //         urls.map(async url => {
  //           return await Axios.get(url, {
  //             timeout: 1000,
  //             validateStatus: status => true,
  //           });
  //         })
  //       );

  //       setUrlsErroredBooleanArray(
  //         responses.map(
  //           response => !(response.status >= 200 && response.status < 400)
  //         )
  //       );
  //     } catch (error) {
  //       setError(error);
  //     }
  //   }, 500);

  //   React.useEffect(
  //     () => {
  //       validateInputValue(inputValue);
  //     },
  //     [inputValue, validateInputValue]
  //   );

  //   return (
  //     <ColumnStackLayout noMargin expand>
  //       <Line noMargin>
  //         <RaisedButton
  //           onClick={() => {
  //             const urls = options.multiSelection
  //               ? inputValue.split('\n').filter(Boolean)
  //               : [inputValue];
  //             console.log('Urls1112', urls);

  //             onChooseResources(
  //               urls.map(url => {
  //                 const newResource = createNewResource();
  //                 newResource.setFile(url);
  //                 newResource.setName(nft.name);
  //                 newResource.setOrigin('url', url);
  //                 console.log('newResource:', newResource);
  //                 return newResource;
  //               })
  //             );
  //           }}
  //           primary
  //           label={<Trans>Choose</Trans>}
  //           disabled={!!error || hasErroredUrls}
  //         />
  //       </Line>
  //       <AlertMessage kind="warning">
  //         <Trans>
  //           The URLs must be public and stay accessible while you work on this
  //           project - they won't be stored inside the project file. When
  //           exporting a game, the resources pointed by these URLs will be
  //           downloaded and stored inside the game.
  //         </Trans>
  //       </AlertMessage>
  //     </ColumnStackLayout>
  //   );
  // };

  // const UrlChooser = ({
  //   options,
  //   onChooseResources,
  //   createNewResource,
  // }: ResourceStoreChooserProps) => {
  //   const [inputValue, setInputValue] = React.useState('');
  //   const [error, setError] = React.useState<?Error>(null);
  //   const [
  //     urlsErroredBooleanArray,
  //     setUrlsErroredBooleanArray,
  //   ] = React.useState<boolean[]>([]);
  //   const hasErroredUrls = !!urlsErroredBooleanArray.filter(Boolean).length;

  //   const validateInputValue = useDebounce(async (inputValue: string) => {
  //     const urls = options.multiSelection
  //       ? inputValue.split('\n').filter(Boolean)
  //       : [inputValue];
  //     setError(null);
  //     setUrlsErroredBooleanArray([]);

  //     try {
  //       const responses = await Promise.all(
  //         urls.map(async url => {
  //           return await Axios.get(url, {
  //             timeout: 1000,
  //             validateStatus: status => true,
  //           });
  //         })
  //       );

  //       setUrlsErroredBooleanArray(
  //         responses.map(
  //           response => !(response.status >= 200 && response.status < 400)
  //         )
  //       );
  //     } catch (error) {
  //       setError(error);
  //     }
  //   }, 500);

  //   React.useEffect(
  //     () => {
  //       validateInputValue(inputValue);
  //     },
  //     [inputValue, validateInputValue]
  //   );

  //   return (
  //     <ColumnStackLayout noMargin expand>
  //       <Line noMargin>
  //         <TextFieldWithButtonLayout
  //           renderButton={style => (
  //             <RaisedButton
  //               onClick={() => {
  //                 const urls = options.multiSelection
  //                   ? inputValue.split('\n').filter(Boolean)
  //                   : [inputValue];

  //                 onChooseResources(
  //                   urls.map(url => {
  //                     const newResource = createNewResource();
  //                     newResource.setFile(url);
  //                     newResource.setName(path.basename(url));
  //                     newResource.setOrigin('url', url);

  //                     return newResource;
  //                   })
  //                 );
  //               }}
  //               primary
  //               label={<Trans>Choose</Trans>}
  //               style={style}
  //               disabled={!!error || hasErroredUrls}
  //             />
  //           )}
  //           renderTextField={() => (
  //             <SemiControlledTextField
  //               floatingLabelText={
  //                 options.multiSelection ? (
  //                   <Trans>Resource(s) URL(s) (one per line)</Trans>
  //                 ) : (
  //                   <Trans>Resource URL</Trans>
  //                 )
  //               }
  //               value={inputValue}
  //               onChange={setInputValue}
  //               multiline={options.multiSelection}
  //               rows={1}
  //               rowsMax={5}
  //               fullWidth
  //               errorText={
  //                 error ? (
  //                   <Trans>
  //                     There was an error verifying the URL(s). Please check they
  //                     are correct.
  //                   </Trans>
  //                 ) : hasErroredUrls ? (
  //                   <Trans>
  //                     Unable to verify URLs{' '}
  //                     {urlsErroredBooleanArray
  //                       .map((isErrored, index) => {
  //                         if (isErrored) return '#' + (index + 1);
  //                         return null;
  //                       })
  //                       .filter(Boolean)
  //                       .join(', ')}
  //                     . Please check they are correct.
  //                   </Trans>
  //                 ) : null
  //               }
  //             />
  //           )}
  //         />
  //       </Line>
  //       <AlertMessage kind="warning">
  //         <Trans>
  //           The URLs must be public and stay accessible while you work on this
  //           project - they won't be stored inside the project file. When
  //           exporting a game, the resources pointed by these URLs will be
  //           downloaded and stored inside the game.
  //         </Trans>
  //       </AlertMessage>
  //     </ColumnStackLayout>
  //   );
  // };

  // const browserResourceSources: Array<ResourceSource> = [
  //   ...allResourceKindsAndMetadata.map(({ kind, createNewResource }) => ({
  //     name: `url-chooser-${kind}`,
  //     displayName: t`Use a public URL`,
  //     displayTab: 'import-advanced',
  //     kind,
  //     renderComponent: (props: ResourceSourceComponentProps) => (
  //       <UrlChooser
  //         createNewResource={createNewResource}
  //         onChooseResources={props.onChooseResources}
  //         options={props.options}
  //         key={`url-chooser-${kind}`}
  //       />
  //     ),
  //   })),
  // ];

  // const dafuck = () =>
  //   // ...
  //   allResourceKindsAndMetadata.map(({ kind, createNewResource }) => ({
  //     name: `url-chooser-${kind}`,
  //     displayName: t`Use a public URL`,
  //     displayTab: 'import-advanced',
  //     kind,
  //     renderComponent: (props: ResourceSourceComponentProps) => (
  //       <UrlChooser
  //         createNewResource={createNewResource}
  //         onChooseResources={props.onChooseResources}
  //         options={props.options}
  //         key={`url-chooser-${kind}`}
  //       />
  //     ),
  //   }));

  return (
    <div>
      <h2>NFT Detail Page</h2>
      <p>NFT Name: {nft.name}</p>
      <p>NFT Description: {nft.description}</p>
      {/* <p>
        NFT Image: <img src={external_url + nft.image} alt={nft.name} />
      </p> */}
      {/* browserResourceSources */}
      {/* Render the Default component from URLChooser.stories here */}
      {/* <dafuck /> */}
      <Default />
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default NFTDetailPage;
