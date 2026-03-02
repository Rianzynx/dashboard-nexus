import Chart from 'react-apexcharts';

interface PriceChartProps {
    data: [number, number][];
    isDark: boolean;
}

export const PriceChart = ({ data, isDark }: PriceChartProps) => {
    const series = [{
        name: 'Preço',
        data: data
    }];

    const options: ApexCharts.ApexOptions = {
        chart: {
            type: 'area',
            toolbar: { show: false },
            sparkline: { enabled: true },
            animations: {
                enabled: true,
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
        },
        xaxis: {
            type: 'datetime',
        },
        colors: [isDark ? '#ef4444' : '#111827'],
        stroke: {
            curve: 'smooth',
            width: 2,
            lineCap: 'round'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [0, 100]
            }
        },
        tooltip: {
            theme: isDark ? 'dark' : 'light',
            x: { format: 'dd MMM, HH:mm' },
            y: {
                formatter: (val) => {
                    return `$ ${val.toLocaleString(undefined, {
                        minimumFractionDigits: val < 1 ? 4 : 2,
                        maximumFractionDigits: val < 1 ? 8 : 2
                    })}`;
                }
            }
        }
    };

    return (
        <div className="w-full mt-6 bg-white/5 rounded-2xl p-4 border border-gray-300 dark:border-white/5 overflow-hidden">
            <Chart options={options} series={series} type="area" height={160} />
        </div>
    );
};