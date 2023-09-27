import {useCallback, useState} from 'react';
import {Alert, Linking} from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {getFileNameFromUrl, getFolderPath} from './constant';
import {setPermission} from '../../../store/slices/storage/storagePermissionSlice';
import localStorage from '../../../hooks/Utils/localStorage';
import {useToast} from 'react-native-toast-notifications';
import useConnectionCheck from '../../../hooks/Network/useConnectionCheck';
import {toastNotification} from '../../../utils/constants';
import useApplovinRewardedAd from '../../../hooks/Ads/Rewarded/useApplovinRewardedAd';

const STORAGE_PERMISSION_KEY = '@StoragePermission';

export const useDownload = data => {
  const {isAdShown, isAdPriority, isApplovin} = useAppSelector(
    state => state.ads,
  );
  const storagePermission = useAppSelector(state => state.storagePermission);
  const {isRewardedAdReady, showRewardedAd} = useApplovinRewardedAd();
  const [inputValue, setInputValue] = useState(data?.url);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [currentSize, setCurrentSize] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const toast = useToast();
  const netInfoState = useConnectionCheck();

  const openAppSettings = useCallback(async () => {
    Linking.openSettings();
    dispatch(setPermission(true));
    await localStorage.setItem(STORAGE_PERMISSION_KEY, 'true');
  }, [dispatch]);

  const downloadFile = async (url, path, mime) => {
    try {
      await RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          path: path,
          useDownloadManager: true,
          notification: true,
          title: getFileNameFromUrl(url),
          description: `${getFileNameFromUrl(url)} is downloading...`,
          mime: mime,
          mediaScannable: true,
        },
      })
        .fetch('GET', url)
        .progress((received, total) => {
          const progress = received / total;
          setCurrentSize(received);
          setTotalSize(total);
          setDownloadProgress(progress);
          setInputValue('');
          setSelectedOption('');
        })
        .then(async res => {
          setDownloadProgress(0);
          setInputValue('');
          setSelectedOption('');
          setLoading(false);
          toast.show(
            `Download Movie Successfully.`,
            toastNotification('success'),
          );
        });
    } catch (error) {
      setDownloadProgress(0);
      setInputValue('');
      setSelectedOption('');
      setLoading(false);
      toast.show(
        'Download Error. Please try again.',
        toastNotification('danger'),
      );
    }
  };

  const onDownloadPressHandler = async fileType => {
    if (netInfoState.isConnected) {
      if (storagePermission) {
        const url = data?.url;
        const mime = 'video/mp4';
        const fileName = getFileNameFromUrl(url);
        const path = `${getFolderPath(fileType)}/${fileName}`;
        if (isAdShown === true) {
          setLoading(true);
          if (isApplovin) {
            if (isRewardedAdReady) {
              await showRewardedAd();
            } else {
              await showRewardedAd();
            }
          } else {
            await showRewardedAd();
          }
          downloadFile(url, path, mime);
        } else {
          setLoading(true);
          downloadFile(url, path, mime);
        }
      } else {
        Alert.alert(
          'Storage Permission',
          'Movie Mingle needs access to your storage in order to save files.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Settings',
              onPress: () => openAppSettings(),
            },
          ],
        );
      }
    } else {
      toast.show('Network is not available!!', toastNotification('normal'));
    }
  };

  return {
    handleSelectOption,
    selectedOption,
    onChangeInputText,
    onPasteBtnPressHandler,
    inputValue,
    isAdShown,
    isAdPriority,
    isApplovin,
    onDownloadPressHandler,
    downloadProgress,
    currentSize,
    totalSize,
    loading,
  };
};
