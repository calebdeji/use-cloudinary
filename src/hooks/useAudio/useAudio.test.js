import { renderHook, act, cleanup } from '@testing-library/react-hooks';

import {
  useAudio,
} from '../../index';

describe('useAudio', () => {
  afterEach(cleanup)

  it("throws an error when no cloud name is provided", async () => {
    const { result } = renderHook(() => useAudio());
    await act(async () => await expect(result.error).toBeInstanceOf(Error))
  });

  it("throws an error when no public_id is provided to getAudio", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAudio({ cloud_name: "testing-hooks-upload" }));
    await act(async () => {
      await expect(() => result.current.getAudio()).toThrow();

    })

    await waitForNextUpdate();
  });

  it("updates status to loading when calling getAudio", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAudio({ cloud_name: "testing-hooks-upload" }));
    await act(async () => {
      await result.current.getAudio({ public_id: "game-sounds/switch" })
      expect(result.current.status).toBe("loading");
    });

    await waitForNextUpdate()

    expect(result.current.status).toBe("success");
  });

  it("updates data to a Cloudinary URL on successful request", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAudio({ cloud_name: "testing-hooks-upload" }));

    await act(async () => {
      result.current.getAudio({ public_id: "game-sounds/switch" })
    });

    await act(async () => await waitForNextUpdate())

    expect(result.current.data).toMatch(/https?:\/\/res\.cloudinary\.com\/\S+/)
  });
})