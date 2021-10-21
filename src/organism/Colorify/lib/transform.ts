import {ColorModel} from '../Colorify';

interface serverTileInformation {
  hex: string;
  name: string;
  __v: number;
  _id: string;
}

export const transformData = (entries: serverTileInformation[]): ColorModel[] =>
  entries.map(({hex, name, _id}) => ({
    hex,
    name,
    id: _id
  }));

export const transformSingleEntry = ({
  hex,
  name,
  _id
}: serverTileInformation): ColorModel => ({
  hex,
  name,
  id: _id
});
