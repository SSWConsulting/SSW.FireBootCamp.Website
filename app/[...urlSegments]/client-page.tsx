'use client';
import { Blocks } from '@/components/blocks';
import ErrorBoundary from '@/components/error-boundary';
import { PageQuery, PageQueryVariables } from '@/tina/__generated__/types';
import { useTina } from 'tinacms/dist/react';

export interface ClientPageProps {
  query: string;
  data: PageQuery;
  variables: PageQueryVariables;
}

export default function ClientPage(props: ClientPageProps) {
  const { data: tinaData } = useTina({
    query: props.query,
    data: props.data,
    variables: props.variables,
  });
  return (
    <ErrorBoundary>
      <Blocks {...tinaData?.page} />
    </ErrorBoundary>
  );
}
