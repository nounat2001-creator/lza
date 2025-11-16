import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

interface ChartDataItem {
  value: number;
  color: string;
  text: string;
  name: string;
}

interface PortfolioPieChartProps {
  data: ChartDataItem[];
}

const PortfolioPieChart: React.FC<PortfolioPieChartProps> = ({ data }) => {
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  const renderDot = (color: string) => {
    return <View style={[styles.dot, { backgroundColor: color }]} />;
  };

  const renderLegendComponent = () => {
    return (
      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={`legend-${index}`} style={styles.legendItem}>
            {renderDot(item.color)}
            <View>
                <Text style={styles.legendText}>{item.name}</Text>
                <Text style={styles.legendValue}>${item.value.toFixed(2)}</Text>
            </View>
            <Text style={styles.legendPercentage}>
              {((item.value / totalValue) * 100).toFixed(1)}%
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.chartTitle}>Répartition du Portefeuille</Text>
      <View style={styles.chartWrapper}>
        <PieChart
          data={data}
          donut
          showText
          textColor="#111827"
          radius={80}
          innerRadius={55}
          textSize={14}
          focusOnPress
          showValuesAsLabels
          textBackgroundRadius={16}
          textBackgroundColor="#ffffff"
          toggleFocusOnPress={false}
          centerLabelComponent={() => {
            return (
              <View style={styles.centerLabel}>
                <Text style={styles.centerLabelTotal}>Total</Text>
                <Text style={styles.centerLabelValue}>${totalValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</Text>
              </View>
            );
          }}
        />
      </View>
      {renderLegendComponent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  chartWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  centerLabel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerLabelTotal: {
    fontSize: 14,
    color: '#6B7280',
  },
  centerLabelValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  legendContainer: {
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  legendText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  legendValue: {
    fontSize: 12,
    color: '#6B7280',
  },
  legendPercentage: {
    marginLeft: 'auto',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  }
});

export default PortfolioPieChart;
