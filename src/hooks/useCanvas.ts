import {RefObject, useEffect, useMemo, useState} from 'react';
import { API as DataAPI, createAPI as createDataAPI } from '@novorender/data-js-api';
import { SceneData } from '../types'
import { loadScene } from '../helpers';

export const useScene = (ref: RefObject<HTMLCanvasElement> | null): SceneData | { view: null } => {
  const [sceneData, setSceneData] = useState<null | SceneData>(null)

  const dataApi: DataAPI = useMemo(() => createDataAPI({
    serviceUrl: "https://data.novorender.com/api",
  }), []);

  useEffect(() => {
    if (ref?.current) {
      const canvas = ref.current

      loadScene(dataApi, canvas).then((data: SceneData | undefined) => {
        if (data) {
          setSceneData(data)
        }
      });
    }
  }, [ref, dataApi]);

  return sceneData ? {
    ...sceneData,
  } : { view: null };
}