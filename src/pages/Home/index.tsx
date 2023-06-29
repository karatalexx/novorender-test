import { useEffect, useRef, useState} from 'react';
import { ReadonlyVec3, ReadonlyQuat } from 'gl-matrix'
import { Canvas } from '../../components/Canvas';
import { Form } from '../../components/Form';
import { ButtonPosition } from '../../components/ButtonPosition';
import { useScene } from '../../hooks/useCanvas';
import { renderView } from '../../helpers/renderView';

type Positions = {
  [key: string]: {
    position: ReadonlyVec3,
    rotation: ReadonlyQuat,
  },
}

export const Home = () => {
  const ref = useRef<null | HTMLCanvasElement>(null);
  const [positions, setPositions] = useState<Positions>({});
  const { view } = useScene(ref);

  useEffect(() => {
    if (view && ref.current) {
      renderView(view, ref.current)
    }
  }, [view]);

  const handleSavePosition = (number: string) => {
    if (view) {
      const position: Float32Array = new Float32Array([...view.camera.position]);
      const rotation: Float32Array = new Float32Array([...view.camera.rotation]);
      setPositions((prevState) => ({
        ...prevState,
        [number]: {
          position,
          rotation,
        }
      }));
    }
  }

  const handleMoveToPosition = async (number: string) => {
    if (positions[number] && view) {
      view.camera.controller.moveTo(positions[number].position, positions[number].rotation);
    }
  }

  const handleSearch = (value: string) => {
    console.log(value);
  }

  return <div className='home'>
    <div className="button-container">
      <ButtonPosition number="1" handleSavePosition={handleSavePosition} handleMoveToPosition={handleMoveToPosition} />
      <ButtonPosition number="2" handleSavePosition={handleSavePosition} handleMoveToPosition={handleMoveToPosition} />
      <ButtonPosition number="3" handleSavePosition={handleSavePosition} handleMoveToPosition={handleMoveToPosition} />
      <Form handleSearch={handleSearch} />
    </div>
    <Canvas ref={ref} />
    <input type="text"/>
  </div>
}