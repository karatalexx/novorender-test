import { API as WebglAPI, createAPI as createWebglAPI } from '@novorender/webgl-api';
import { API as DataAPI } from '@novorender/data-js-api';
import { SceneData } from '../types';

export const loadScene = async (dataApi: DataAPI, canvas: HTMLCanvasElement): Promise<SceneData | undefined> => {
  try {
    const sceneData: any = await dataApi
      .loadScene("3b5e65560dc4422da5c7c3f827b6a77c")
      .then((res: any) => {
        if ("error" in res) {
          throw res;
        } else {
          return res;
        }
      });

    const { url, db, settings, camera: cameraParams } = sceneData;

    const api: WebglAPI = createWebglAPI();
    const scene = await api.loadScene(url, db);
    const view = await api.createView(settings, canvas);


    const neutral = api.createHighlight({
      kind: "neutral",
    });

    // @ts-ignore
    view.applySettings({ quality: { resolution: { value: 1 } }, objectHighlights: [neutral] });

    const camera = cameraParams ?? ({ kind: "flight" } as any);
    view.camera.controller = api.createCameraController({
      ...camera,
      kind: 'flight',
    }, canvas);

    view.scene = scene;

    return {
      view,
    }
  } catch (e) {
    console.warn(e);
  }
};