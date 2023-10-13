import PeriodPaginator from '@/components/PeriodPaginator';
import { Chart, ChartWrapper, Legend, Wrapper } from './components';

function Statistics() {
	return (
		<Wrapper>
			<PeriodPaginator />
			<Legend />
			<ChartWrapper>
				<Chart />
			</ChartWrapper>
		</Wrapper>
	);
}

export default Statistics;
