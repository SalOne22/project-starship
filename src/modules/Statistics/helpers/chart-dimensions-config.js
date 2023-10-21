export const breakpoints = {
  sm: 'mobile',
  md: 'tablet',
  xl: 'desktop',
};
export const chartDimensions = {
  [breakpoints.sm]: {
    barChartHeight: 300,
    barChartMargin: { top: 18, left: -20 },
    barGap: 8,
    barCategoryGap: 30,
    barSize: 22,
    xTickFontSize: 12,
    yTickMargin: 8,
    barLabelFontSize: 12,
  },
  [breakpoints.md]: {
    barChartHeight: 330,
    barChartMargin: { top: 18, left: 0 },
    barGap: 14,
    barCategoryGap: 130,
    barSize: 27,
    xTickFontSize: 14,
    yTickMargin: 26,
    barLabelFontSize: 16,
  },
  [breakpoints.xl]: {
    barChartHeight: 330,
    barChartMargin: { top: 18, left: 26 },
    barGap: 14,
    barCategoryGap: 160,
    barSize: 27,
    xTickFontSize: 14,
    yTickMargin: 56,
    barLabelFontSize: 16,
  },
};
