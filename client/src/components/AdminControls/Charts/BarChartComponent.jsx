import { useState, useEffect } from 'react';
import { BarChart } from '@tremor/react';
import { useAuth } from "../../../AuthContext";

export function BarChartComponent() {
    const { token } = useAuth();
    const API_ENDPOINT = import.meta.env.VITE_API_BASE_URL;

    const [successfulMedicineOrders, setSuccessfulMedicineOrders] = useState(() => new Array(12).fill(0));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };

                const getResponseData = async (url) => {
                    const response = await fetch(url, { headers });
                    const data = await response.json();
                    return data;
                };

                const successfulMedicineOrdersResponse = await getResponseData(`${API_ENDPOINT}/admin/getAllOrders?deliveryStatus=true`);
                console.log(successfulMedicineOrdersResponse);

                const successfulMedicineOrdersData = successfulMedicineOrdersResponse || [];

                const FindData = (Data, updateData) => {
                    console.log(Data);
                    updateData = new Array(12).fill(0);
                    Data.forEach(order => {
                        const date = new Date(order.orderDate);
                        const month = date.getMonth();
                        console.log("month",month);
                        if (!isNaN(month) && month >= 0 && month < 12) {
                            updateData[month] += 1;
                        }
                    });
                    return updateData;
                }

                setSuccessfulMedicineOrders(FindData(successfulMedicineOrdersData, successfulMedicineOrders));

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [token, API_ENDPOINT]);
    console.log(successfulMedicineOrders);

    const chartData = [
        { date: 'Jan 24', 'Successful Medicine Orders': successfulMedicineOrders[0] },
        { date: 'Feb 24', 'Successful Medicine Orders': successfulMedicineOrders[1] },
        { date: 'Mar 24', 'Successful Medicine Orders': successfulMedicineOrders[2] },
        { date: 'Apr 24', 'Successful Medicine Orders': successfulMedicineOrders[3] },
        { date: 'May 24', 'Successful Medicine Orders': successfulMedicineOrders[4] },
        { date: 'Jun 24', 'Successful Medicine Orders': successfulMedicineOrders[5] },
        { date: 'Jul 24', 'Successful Medicine Orders': successfulMedicineOrders[6] },
        { date: 'Aug 24', 'Successful Medicine Orders': successfulMedicineOrders[7] },
        { date: 'Sep 24', 'Successful Medicine Orders': successfulMedicineOrders[8] },
        { date: 'Oct 24', 'Successful Medicine Orders': successfulMedicineOrders[9] },
        { date: 'Nov 24', 'Successful Medicine Orders': successfulMedicineOrders[10] },
        { date: 'Dec 24', 'Successful Medicine Orders': successfulMedicineOrders[11] },
    ];

    const dataFormatter = (number) => Intl.NumberFormat('us').format(number).toString();

    return (
        <BarChart
            data={chartData}
            index="date"
            categories={['Successful Medicine Orders']}
            colors={['teal']}
            valueFormatter={dataFormatter}
            yAxisWidth={100}
            onValueChange={(v) => console.log(v)}
        />
    );
}
