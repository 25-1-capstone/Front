import React, { useRef, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 5;

interface CustomWheelPickerProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

function useWheelPickerSelector(
  options: string[],
  value: string,
  itemHeight: number,
  onChange: (value: string) => void
) {
  const scrollRef = useRef<ScrollView>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const idx = options.indexOf(value);
    if (scrollRef.current && idx >= 0) {
      scrollRef.current.scrollTo({ y: idx * itemHeight, animated: false });
    }
  }, [value, options, itemHeight]);

  const onMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = e.nativeEvent.contentOffset.y;

      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => {
        const idx = Math.round(y / itemHeight);
        const newValue = options[idx];
        if (newValue && newValue !== value) {
          onChange(newValue);
        }
        scrollRef.current?.scrollTo({ y: idx * itemHeight, animated: false });
      }, 80);
    },
    [itemHeight, options, onChange, value]
  );

  return { scrollRef, onMomentumScrollEnd };
}

export default function CustomWheelPicker({
  options,
  value,
  onChange,
}: CustomWheelPickerProps) {
  const { scrollRef, onMomentumScrollEnd } = useWheelPickerSelector(
    options,
    value,
    ITEM_HEIGHT,
    onChange
  );

  return (
    <View
      style={{
        height: ITEM_HEIGHT * VISIBLE_ITEMS,
        width: 70,
        backgroundColor: "#F5F5F5",
      }}
    >
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
      >
        {options.map((opt, idx) => (
          <View
            key={idx}
            style={{
              height: ITEM_HEIGHT,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: value === opt ? "#222" : "#bbb",
                fontWeight: value === opt ? "bold" : "normal",
              }}
            >
              {opt}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
