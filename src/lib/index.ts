export function encode<T>(data: T): Uint16Array {
  //JSON.stringify无法转换blob
  const str = JSON.stringify(data);
  const buf = new ArrayBuffer(str.length * 2);
  const bufView = new Uint16Array(buf);
  bufView.set(str.split("").map((_, i) => str.charCodeAt(i)));
  return bufView;
}

export function decode<T = unknown>(buf: ArrayBufferLike): T {
  return JSON.parse(
    String.fromCharCode.apply(
      null,
      (new Uint16Array(buf) as unknown) as number[]
    )
  );
}