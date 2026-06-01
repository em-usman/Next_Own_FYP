import { AppIcon } from "@/components/Icons/AppIcon";
import { CategoryListItem } from "@/components/home/CategoryListItem";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { PAKISTAN_PROVINCES } from "@/data/pakistanLocations";
import { useTheme } from "@/hooks/use-theme";
import { useSearch } from "@/hooks/useSearch";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

type SortOption = "relevant" | "newest" | "price-low" | "price-high";

const SORT_OPTIONS: { key: SortOption; label: string }[] = [
  { key: "relevant", label: "Most relevant" },
  { key: "newest", label: "Newly listed" },
  { key: "price-low", label: "Lowest price" },
  { key: "price-high", label: "Highest price" },
];

function parsePriceNum(priceText: string): number {
  const n = Number(priceText.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export default function SearchResultsScreen() {
  const theme = useTheme();
  const { q } = useLocalSearchParams<{ q?: string }>();
  const query = Array.isArray(q) ? q[0] : q || "";

  const { results, isLoading } = useSearch(query);

  const [sortOption, setSortOption] = useState<SortOption>("relevant");
  const [sortModalVisible, setSortModalVisible] = useState(false);

  // Location filter state
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  // Get available districts based on selected province
  const availableDistricts = selectedProvince
    ? PAKISTAN_PROVINCES.find((p) => p.name === selectedProvince)?.districts ||
      []
    : [];

  // Get available cities based on selected district
  const availableCities =
    selectedProvince && selectedDistrict
      ? availableDistricts.find((d) => d.name === selectedDistrict)?.cities ||
        []
      : [];

  // Apply location filters
  const locationFiltered = useMemo(() => {
    if (!selectedProvince && !selectedDistrict && !selectedCity) {
      return results;
    }
    return results.filter((listing) => {
      if (selectedProvince && listing.province !== selectedProvince)
        return false;
      if (selectedDistrict && listing.district !== selectedDistrict)
        return false;
      if (selectedCity && listing.city !== selectedCity) return false;
      return true;
    });
  }, [results, selectedProvince, selectedDistrict, selectedCity]);

  // Apply sorting
  const sorted = useMemo(() => {
    if (sortOption === "relevant") return locationFiltered;
    if (sortOption === "newest") {
      return [...locationFiltered].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA; // Newest first
      });
    }
    return [...locationFiltered].sort((a, b) => {
      const pa = parsePriceNum(a.price);
      const pb = parsePriceNum(b.price);
      return sortOption === "price-low" ? pa - pb : pb - pa;
    });
  }, [locationFiltered, sortOption]);

  const activeSortLabel =
    SORT_OPTIONS.find((o) => o.key === sortOption)?.label ?? "Sort";

  // Build location filter label
  const locationFilterLabel = selectedCity
    ? selectedCity
    : selectedDistrict
      ? selectedDistrict
      : selectedProvince
        ? selectedProvince
        : "Location";

  const hasLocationFilter = !!(
    selectedProvince ||
    selectedDistrict ||
    selectedCity
  );

  return (
    <>
      <ThemedView className="flex-1">
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 56,
            paddingHorizontal: 16,
            paddingBottom: 12,
            gap: 12,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
          }}
        >
          <TouchableOpacity onPress={() => router.back()} hitSlop={10}>
            <AppIcon
              family="ion"
              name="arrow-back"
              size={24}
              color={theme.text}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: theme.backgroundElement,
                borderWidth: 1,
                borderColor: theme.border,
                borderRadius: 12,
                paddingHorizontal: 12,
                height: 42,
                gap: 8,
              }}
            >
              <AppIcon
                family="ion"
                name="search-outline"
                size={16}
                color={theme.textMuted}
              />
              <ThemedText
                style={{
                  flex: 1,
                  fontSize: 15,
                  color: query ? theme.text : theme.textMuted,
                }}
                numberOfLines={1}
              >
                {query || "Search listings..."}
              </ThemedText>
            </View>
          </TouchableOpacity>
        </View>

        {/* Sort + Location Filter + count row */}
        {!isLoading && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              paddingVertical: 10,
              gap: 10,
            }}
          >
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ flex: 1 }}
            >
              {sorted.length} result{sorted.length !== 1 ? "s" : ""} for{" "}
              <ThemedText type="smallBold">"{query}"</ThemedText>
            </ThemedText>

            {/* Location Filter Button */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                borderWidth: 1.5,
                borderColor: hasLocationFilter ? theme.primary : theme.border,
                backgroundColor: hasLocationFilter
                  ? theme.primary + "15"
                  : theme.backgroundElement,
              }}
              onPress={() => setLocationModalVisible(true)}
            >
              <AppIcon
                family="ion"
                name="location"
                size={14}
                color={hasLocationFilter ? theme.primary : theme.textMuted}
              />
              <ThemedText
                style={{
                  fontSize: 13,
                  color: hasLocationFilter ? theme.primary : theme.text,
                  fontWeight: "600",
                }}
              >
                {locationFilterLabel}
              </ThemedText>
            </TouchableOpacity>

            {/* Sort Button */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: theme.border,
                backgroundColor: theme.backgroundElement,
              }}
              onPress={() => setSortModalVisible(true)}
            >
              <AppIcon
                family="ion"
                name="options-outline"
                size={14}
                color={theme.primary}
              />
              <ThemedText
                style={{
                  fontSize: 13,
                  color: theme.primary,
                  fontWeight: "600",
                }}
              >
                {activeSortLabel}
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}

        {/* Loading */}
        {isLoading && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <ActivityIndicator size="large" color={theme.primary} />
            <ThemedText type="small" themeColor="textSecondary">
              Searching across all categories...
            </ThemedText>
          </View>
        )}

        {/* Empty */}
        {!isLoading && sorted.length === 0 && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              paddingHorizontal: 32,
            }}
          >
            <AppIcon
              family="ion"
              name="search-outline"
              size={44}
              color={theme.textMuted}
            />
            <ThemedText
              type="subtitle"
              style={{ fontSize: 18, textAlign: "center" }}
            >
              No results found
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ textAlign: "center" }}
            >
              No listings matched "{query}". Try different keywords.
            </ThemedText>
          </View>
        )}

        {/* Results */}
        {!isLoading && sorted.length > 0 && (
          <FlatList
            data={sorted}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
            renderItem={({ item }) => <CategoryListItem listing={item} />}
          />
        )}
      </ThemedView>

      {/* Sort modal */}
      <Modal
        visible={sortModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.45)" }}
          activeOpacity={1}
          onPress={() => setSortModalVisible(false)}
        />
        <ThemedView
          type="backgroundElement"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            paddingBottom: 32,
          }}
        >
          <View
            style={{ alignItems: "center", paddingTop: 10, paddingBottom: 4 }}
          >
            <View
              style={{
                width: 44,
                height: 4,
                borderRadius: 99,
                backgroundColor: theme.border,
              }}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 14,
              borderBottomWidth: 1,
              borderBottomColor: theme.border,
            }}
          >
            <ThemedText type="subtitle" style={{ fontSize: 20 }}>
              Sort by
            </ThemedText>
          </View>
          {SORT_OPTIONS.map((option) => {
            const isSelected = option.key === sortOption;
            return (
              <TouchableOpacity
                key={option.key}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.border,
                }}
                onPress={() => {
                  setSortOption(option.key);
                  setSortModalVisible(false);
                }}
              >
                <ThemedText
                  style={{
                    fontSize: 15,
                    fontWeight: isSelected ? "700" : "400",
                  }}
                >
                  {option.label}
                </ThemedText>
                {isSelected && (
                  <AppIcon
                    family="ion"
                    name="checkmark"
                    size={20}
                    color={theme.primary}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </ThemedView>
      </Modal>

      {/* Location Filter Modal */}
      <Modal
        visible={locationModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setLocationModalVisible(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.45)" }}
          activeOpacity={1}
          onPress={() => setLocationModalVisible(false)}
        />
        <ThemedView
          type="backgroundElement"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            maxHeight: "80%",
          }}
        >
          <View
            style={{ alignItems: "center", paddingTop: 10, paddingBottom: 4 }}
          >
            <View
              style={{
                width: 44,
                height: 4,
                borderRadius: 99,
                backgroundColor: theme.border,
              }}
            />
          </View>

          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 14,
              borderBottomWidth: 1,
              borderBottomColor: theme.border,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ThemedText type="subtitle" style={{ fontSize: 20 }}>
              Filter by Location
            </ThemedText>
            {hasLocationFilter && (
              <TouchableOpacity
                onPress={() => {
                  setSelectedProvince("");
                  setSelectedDistrict("");
                  setSelectedCity("");
                }}
              >
                <ThemedText
                  style={{
                    fontSize: 13,
                    color: theme.primary,
                    fontWeight: "600",
                  }}
                >
                  Clear
                </ThemedText>
              </TouchableOpacity>
            )}
          </View>

          <ScrollView
            style={{ paddingHorizontal: 20, paddingVertical: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Province Selection */}
            <View style={{ marginBottom: 20 }}>
              <ThemedText
                style={{ fontSize: 14, fontWeight: "600", marginBottom: 8 }}
              >
                Province
              </ThemedText>
              {selectedProvince && (
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                    backgroundColor: theme.primary + "20",
                    marginBottom: 8,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    setSelectedProvince("");
                    setSelectedDistrict("");
                    setSelectedCity("");
                  }}
                >
                  <ThemedText
                    style={{
                      fontSize: 13,
                      color: theme.primary,
                      fontWeight: "600",
                    }}
                  >
                    {selectedProvince}
                  </ThemedText>
                  <AppIcon
                    family="ion"
                    name="close"
                    size={16}
                    color={theme.primary}
                  />
                </TouchableOpacity>
              )}
              <View
                style={{
                  borderWidth: 1,
                  borderColor: theme.border,
                  borderRadius: 12,
                  backgroundColor: theme.backgroundElement,
                  maxHeight: 220,
                  overflow: "hidden",
                }}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  {PAKISTAN_PROVINCES.map((province) => (
                    <TouchableOpacity
                      key={province.name}
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 12,
                        borderBottomWidth: 1,
                        borderBottomColor: theme.border,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        setSelectedProvince(province.name);
                        setSelectedDistrict("");
                        setSelectedCity("");
                      }}
                    >
                      <ThemedText style={{ fontSize: 14 }}>
                        {province.name}
                      </ThemedText>
                      {selectedProvince === province.name && (
                        <AppIcon
                          family="ion"
                          name="checkmark"
                          size={18}
                          color={theme.primary}
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            {/* District Selection */}
            {selectedProvince && (
              <View style={{ marginBottom: 20 }}>
                <ThemedText
                  style={{ fontSize: 14, fontWeight: "600", marginBottom: 8 }}
                >
                  District
                </ThemedText>
                {selectedDistrict && (
                  <TouchableOpacity
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 12,
                      borderRadius: 8,
                      backgroundColor: theme.primary + "20",
                      marginBottom: 8,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      setSelectedDistrict("");
                      setSelectedCity("");
                    }}
                  >
                    <ThemedText
                      style={{
                        fontSize: 13,
                        color: theme.primary,
                        fontWeight: "600",
                      }}
                    >
                      {selectedDistrict}
                    </ThemedText>
                    <AppIcon
                      family="ion"
                      name="close"
                      size={16}
                      color={theme.primary}
                    />
                  </TouchableOpacity>
                )}
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: theme.border,
                    borderRadius: 12,
                    backgroundColor: theme.backgroundElement,
                    maxHeight: 220,
                    overflow: "hidden",
                  }}
                >
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {availableDistricts.map((district) => (
                      <TouchableOpacity
                        key={district.name}
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 12,
                          borderBottomWidth: 1,
                          borderBottomColor: theme.border,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        onPress={() => {
                          setSelectedDistrict(district.name);
                          setSelectedCity("");
                        }}
                      >
                        <ThemedText style={{ fontSize: 14 }}>
                          {district.name}
                        </ThemedText>
                        {selectedDistrict === district.name && (
                          <AppIcon
                            family="ion"
                            name="checkmark"
                            size={18}
                            color={theme.primary}
                          />
                        )}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            )}

            {/* City Selection */}
            {selectedDistrict && (
              <View style={{ marginBottom: 20 }}>
                <ThemedText
                  style={{ fontSize: 14, fontWeight: "600", marginBottom: 8 }}
                >
                  City
                </ThemedText>
                {selectedCity && (
                  <TouchableOpacity
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 12,
                      borderRadius: 8,
                      backgroundColor: theme.primary + "20",
                      marginBottom: 8,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    onPress={() => setSelectedCity("")}
                  >
                    <ThemedText
                      style={{
                        fontSize: 13,
                        color: theme.primary,
                        fontWeight: "600",
                      }}
                    >
                      {selectedCity}
                    </ThemedText>
                    <AppIcon
                      family="ion"
                      name="close"
                      size={16}
                      color={theme.primary}
                    />
                  </TouchableOpacity>
                )}
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: theme.border,
                    borderRadius: 12,
                    backgroundColor: theme.backgroundElement,
                    maxHeight: 220,
                    overflow: "hidden",
                  }}
                >
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {availableCities.map((city) => (
                      <TouchableOpacity
                        key={city}
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 12,
                          borderBottomWidth: 1,
                          borderBottomColor: theme.border,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        onPress={() => setSelectedCity(city)}
                      >
                        <ThemedText style={{ fontSize: 14 }}>{city}</ThemedText>
                        {selectedCity === city && (
                          <AppIcon
                            family="ion"
                            name="checkmark"
                            size={18}
                            color={theme.primary}
                          />
                        )}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            )}

            {/* Apply Button */}
            <TouchableOpacity
              style={{
                backgroundColor: theme.primary,
                paddingVertical: 12,
                borderRadius: 12,
                alignItems: "center",
                marginTop: 10,
                marginBottom: 16,
              }}
              onPress={() => setLocationModalVisible(false)}
            >
              <ThemedText
                style={{ fontSize: 15, fontWeight: "600", color: "#fff" }}
              >
                Apply Filter
              </ThemedText>
            </TouchableOpacity>
          </ScrollView>
        </ThemedView>
      </Modal>
    </>
  );
}
