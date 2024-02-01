import React, { useMemo } from 'react'
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function costSummary(listArr) {
    return listArr
        .map((listObj) => +listObj.cost)
        .reduce((a, b) => a + b);
}

function costPersentMap(listArr, total) {
    return listArr
        .map((listObj) => +listObj.cost)
        .map((cost) => +(cost / total * 100).toFixed(1));
}

function formatter(numberCost) {
    return numberCost.toLocaleString('ko-KR');
}

export default function Chart({ consumeList, setConsumeList }) {

    const totalCost = useMemo(() => costSummary(consumeList), [ consumeList ]);
    const costDataArr = useMemo(() => costPersentMap(consumeList, totalCost), [ consumeList, totalCost ]);
    const costTitleArr = useMemo(() => consumeList.map((listObj) => listObj.title), [ consumeList ]);

    const handleResetBtnClick = (e) => {
        e.preventDefault();
        const confirmTxt = '초기화할 시 모든 지출 내역이 삭제되며, \n다시는 돌이킬 수 없습니다. \n초기화하시겠습니까?'
        if (window.confirm(confirmTxt)) setConsumeList([]);
    }

    const chartData = {
        labels: costTitleArr,
        datasets: [
            {
                label: 'persent(%)',
                data: costDataArr,
                // backgroundColor: '#D8DFE3',
                backgroundColor: ['#17C1B1', '#1792EE', '#596DEA', '#9774EE', '#E679BF'],
                hoverOffset: 6,
                // hoverBackgroundColor: '#76B0F3',
                hoverBorderWidth: 0,
            },
        ],
    };

    return (
        <div>
            <SummaryContainer>
                <div className='flex justify-between items-center mb-1'>
                    <SummaryTitle>총 지출</SummaryTitle>
                    <ResetBtn onClick={handleResetBtnClick}>초기화</ResetBtn>
                </div>
                <SummaryTotal>{ formatter(totalCost) }원</SummaryTotal>
            </SummaryContainer>
            <ChartContainer>
                <Doughnut fallbackContent={<ChartSkeleton />} data={chartData} />
            </ChartContainer>
        </div>
    )
}

const SummaryContainer = styled.div`
    display: block;
    width: 100%;
    height: auto;
    padding: 12px 12px 14px;
    margin: 0px 0px 20px;
    border-radius: 6px;
    background-color: var(--ui-information);
`;

const SummaryTitle = styled.h2`
    display: block;
    width: auto;
    height: auto;
    font-size: 15px;
    font-weight: 500;
    color: var(--brand-white);
    white-space: nowrap;
`;

const SummaryTotal = styled.p`
    display: block;
    width: 100%;
    height: auto;
    font-size: 18px;
    font-weight: 600;
    color: var(--brand-white);
    white-space: nowrap;
`;

const ResetBtn = styled.button`
    display: block;
    padding: 4px 8px;
    font-size: 12px;
    font-weight: 500;
    color: var(--brand-white);
    border-radius: 16px;
    background-color: rgba(0, 20, 40, 0.2);
`;

const ChartSkeleton = styled.div`
    display: block;
    width: 100%;
    height: 320px;
    border-radius: 2px;
    background-color: var(--grayscale-100);
`;

const ChartContainer = styled.div`
    display: block;
    width: 100%;
    padding: 14px;
    border-radius: 6px;
    border: 1px solid var(--grayscale-100);
`;