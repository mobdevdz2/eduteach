import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { LineChart, BarChart, PieChart, Line, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export class Entity<T extends { id: string }> {
  protected entities: T[] = [];
  
  constructor(public data: T[]) {
    this.entities = data;
  }
  
  // Basic Card rendering
  Cards = () => {
    return (
      this.entities.map((entity) => (
        <Card key={entity.id}>
          <CardHeader>
           <CardTitle> {entity?.name || entity?.title || entity?.id}</CardTitle>
          </CardHeader>
          <CardContent>
            {entity?.description || entity?.details || entity?.id}
          </CardContent>
        </Card>
      ))
    );
  }

  Table = <T extends { id: string }>({
    columns,
    data
  }: {
    columns: ColumnDef<T>[];
    data: T[];
  }) => {
    return (
      <DataTable
        columns={columns}
        data={data}
      />
    );
  }
  
  // Generic chart configuration generator
  toChartConfig = (type: 'line' | 'bar' | 'pie' | 'area' | 'scatter', options: any = {}) => {
    // Call the appropriate chart config method based on type
    switch (type) {
      case 'line':
        return this.toLineChartConfig(options);
      case 'bar':
        return this.toBarChartConfig(options);
      case 'pie':
        return this.toPieChartConfig(options);
      case 'area':
        return this.toAreaChartConfig(options);
      case 'scatter':
        return this.toScatterChartConfig(options);
      default:
        throw new Error(`Chart type '${type}' not supported`);
    }
  }
  
  // Methods to convert entity data to specific chart configurations
  // These methods can be overridden by child classes for custom behavior
  
  protected toLineChartConfig = (options: {
    xKey?: keyof T,
    yKeys?: Array<keyof T | { key: keyof T, name?: string, color?: string }>,
    groupBy?: keyof T
  } = {}) => {
    const { xKey = 'id', yKeys = [], groupBy } = options;
    
    let chartData: any[] = this.entities;
    
    // Process yKeys to standardized format
    const processedYKeys = (yKeys as any[]).map(y => 
      typeof y === 'object' ? y : { key: y }
    );
    
    // Handle groupBy if provided
    if (groupBy) {
      chartData = this.groupAndAggregate(groupBy, processedYKeys.map(y => y.key));
    }
    
    return {
      chartType: 'line',
      data: chartData,
      config: {
        xAxis: { dataKey: xKey },
        series: processedYKeys.map(y => ({
          dataKey: y.key,
          name: y.name || String(y.key),
          color: y.color
        }))
      }
    };
  }
  
  protected toBarChartConfig = (options: {
    xKey?: keyof T,
    yKeys?: Array<keyof T | { key: keyof T, name?: string, color?: string }>,
    groupBy?: keyof T,
    stacked?: boolean
  } = {}) => {
    const { xKey = 'id', yKeys = [], groupBy, stacked = false } = options;
    
    let chartData: any[] = this.entities;
    
    // Process yKeys to standardized format
    const processedYKeys = (yKeys as any[]).map(y => 
      typeof y === 'object' ? y : { key: y }
    );
    
    // Handle groupBy if provided
    if (groupBy) {
      chartData = this.groupAndAggregate(groupBy, processedYKeys.map(y => y.key));
    }
    
    return {
      chartType: 'bar',
      data: chartData,
      config: {
        xAxis: { dataKey: xKey },
        series: processedYKeys.map(y => ({
          dataKey: y.key,
          name: y.name || String(y.key),
          color: y.color,
          stackId: stacked ? 'stack' : undefined
        }))
      }
    };
  }
  
  protected toPieChartConfig = (options: {
    valueKey?: keyof T,
    nameKey?: keyof T,
    colors?: string[]
  } = {}) => {
    const { valueKey = 'id', nameKey = 'id', colors } = options;
    
    return {
      chartType: 'pie',
      data: this.entities,
      config: {
        dataKey: valueKey,
        nameKey: nameKey,
        colors: colors
      }
    };
  }
  
  protected toAreaChartConfig = (options: any = {}) => {
    // Similar to line chart with area property
    const lineConfig = this.toLineChartConfig(options);
    return {
      ...lineConfig,
      chartType: 'area',
      config: {
        ...lineConfig.config,
        series: lineConfig.config.series.map(series => ({
          ...series,
          fill: series.color
        }))
      }
    };
  }
  
  protected toScatterChartConfig = (options: {
    xKey?: keyof T,
    yKey?: keyof T,
    zKey?: keyof T,
    nameKey?: keyof T
  } = {}) => {
    const { xKey = 'id', yKey = 'id', zKey, nameKey = 'id' } = options;
    
    return {
      chartType: 'scatter',
      data: this.entities,
      config: {
        xAxis: { dataKey: xKey },
        yAxis: { dataKey: yKey },
        series: [{
          dataKey: zKey || yKey,
          name: String(nameKey)
        }]
      }
    };
  }
  
  // Generic chart renderer based on chart config
  renderChart = (chartConfig: any, props: {
    width?: number | string,
    height?: number | string,
    showGrid?: boolean,
    showTooltip?: boolean,
    showLegend?: boolean
  } = {}) => {
    const { 
      width = '100%', 
      height = 300, 
      showGrid = true, 
      showTooltip = true, 
      showLegend = true 
    } = props;
    
    const { chartType, data, config } = chartConfig;
    
    // Create chart based on type
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width={width} height={height}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey={config.xAxis.dataKey} />
              <YAxis />
              {showTooltip && <Tooltip />}
              {showLegend && <Legend />}
              {config.series.map((series: any, index: number) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={series.dataKey}
                  name={series.name}
                  stroke={series.color || `#${Math.floor(Math.random()*16777215).toString(16)}`}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
        
      case 'bar':
        return (
          <ResponsiveContainer width={width} height={height}>
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey={config.xAxis.dataKey} />
              <YAxis />
              {showTooltip && <Tooltip />}
              {showLegend && <Legend />}
              {config.series.map((series: any, index: number) => (
                <Bar
                  key={index}
                  dataKey={series.dataKey}
                  name={series.name}
                  fill={series.color || `#${Math.floor(Math.random()*16777215).toString(16)}`}
                  stackId={series.stackId}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'pie':
        return (
          <ResponsiveContainer width={width} height={height}>
            <PieChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              {showTooltip && <Tooltip />}
              {showLegend && <Legend />}
              <Pie
                data={data}
                dataKey={config.dataKey}
                nameKey={config.nameKey}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
            </PieChart>
          </ResponsiveContainer>
        );
        
      // Add other chart types as needed
        
      default:
        return <div>Chart type not supported</div>;
    }
  }
  
  // Data transformation helper methods
  protected groupAndAggregate = (groupByKey: keyof T, valueKeys: Array<keyof T>) => {
    const groups = this.groupBy(groupByKey);
    
    return Object.entries(groups).map(([groupValue, items]) => {
      const result: Record<string, any> = {
        [groupByKey]: groupValue
      };
      
      valueKeys.forEach(valueKey => {
        result[valueKey] = items.reduce((sum, item) => {
          const val = item[valueKey];
          return sum + (typeof val === 'number' ? val : 0);
        }, 0);
      });
      
      return result;
    });
  }
  
  protected groupBy = <K extends keyof T>(key: K): Record<string, T[]> => {
    return this.entities.reduce((acc, entity) => {
      const groupKey = String(entity[key]);
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(entity);
      return acc;
    }, {} as Record<string, T[]>);
  }
  
  // CRUD operations
  getAll = (): T[] => {
    return this.entities;
  }
  
  getById = (id: string): T | undefined => {
    return this.entities.find(entity => entity.id === id);
  }
  
  add = (entity: T): void => {
    if (!this.getById(entity.id)) {
      this.entities.push(entity);
    }
  }
  
  update = (id: string, updatedEntity: Partial<T>): void => {
    const index = this.entities.findIndex(entity => entity.id === id);
    if (index !== -1) {
      this.entities[index] = { ...this.entities[index], ...updatedEntity };
    }
  }
  
  remove = (id: string): void => {
    this.entities = this.entities.filter(entity => entity.id !== id);
  }
  
  // Utility methods
  filter = (predicate: (entity: T) => boolean): Entity<T> => {
    return new Entity<T>(this.entities.filter(predicate));
  }
  
  sort = (compareFn: (a: T, b: T) => number): Entity<T> => {
    return new Entity<T>([...this.entities].sort(compareFn));
  }
  
  count = (): number => {
    return this.entities.length;
  }
  
  // Method to replace all entities
  setEntities = (entities: T[]): void => {
    this.entities = entities;
  }
}