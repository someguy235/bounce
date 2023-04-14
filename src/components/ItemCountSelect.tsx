import {
  Slider,
  SliderMark,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
} from "@chakra-ui/react";

type ItemCountSelectProps = {
  itemSize: number;
  setItemSize: Function;
};
const ItemCountSelect = ({ itemSize, setItemSize }: ItemCountSelectProps) => {
  return (
    <Slider
      aria-label="slider-ex-1"
      defaultValue={itemSize}
      min={10}
      max={100}
      onChangeEnd={(val) => setItemSize(val)}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
      <SliderMark value={25} mt="1" ml="-2.5" fontSize="sm">
        25
      </SliderMark>
      <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
        50
      </SliderMark>
      <SliderMark value={75} mt="1" ml="-2.5" fontSize="sm">
        75
      </SliderMark>
    </Slider>
  );
};

export default ItemCountSelect;
