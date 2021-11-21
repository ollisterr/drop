/**
 * Generated by orval v6.3.0 🍺
 * Do not edit manually.
 * Drop API
 * The OpenAPI schema for drop.energy
 * OpenAPI spec version: 0.1.0
 */
import { useQuery, UseQueryOptions, QueryFunction } from "react-query";
import type {
  DailyConsumptionResponse,
  HTTPValidationError,
  ConsumptionLastTwoWeeksResponse,
} from ".././model";
import { customInstance } from ".././axios";

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

/**
 * @summary Get Consumption
 */
export const getConsumptionKpisConsumptionDailyApartmentIdDateGet = (
  apartmentid: number,
  date: string
) => {
  return customInstance<DailyConsumptionResponse>({
    url: `/kpis/consumption-daily/${apartmentid}/${date}`,
    method: "get",
  });
};

export const getGetConsumptionKpisConsumptionDailyApartmentIdDateGetQueryKey = (
  apartmentid: number,
  date: string
) => [`/kpis/consumption-daily/${apartmentid}/${date}`];

export const useGetConsumptionKpisConsumptionDailyApartmentIdDateGet = <
  TData = AsyncReturnType<
    typeof getConsumptionKpisConsumptionDailyApartmentIdDateGet
  >,
  TError = HTTPValidationError
>(
  apartmentid: number,
  date: string,
  options?: {
    query?: UseQueryOptions<
      AsyncReturnType<
        typeof getConsumptionKpisConsumptionDailyApartmentIdDateGet
      >,
      TError,
      TData
    >;
  }
) => {
  const { query: queryOptions } = options || {};

  const queryKey =
    queryOptions?.queryKey ??
    getGetConsumptionKpisConsumptionDailyApartmentIdDateGetQueryKey(
      apartmentid,
      date
    );

  const queryFn: QueryFunction<
    AsyncReturnType<typeof getConsumptionKpisConsumptionDailyApartmentIdDateGet>
  > = () =>
    getConsumptionKpisConsumptionDailyApartmentIdDateGet(apartmentid, date);

  const query = useQuery<
    AsyncReturnType<
      typeof getConsumptionKpisConsumptionDailyApartmentIdDateGet
    >,
    TError,
    TData
  >(queryKey, queryFn, { enabled: !!(apartmentid && date), ...queryOptions });

  return {
    queryKey,
    ...query,
  };
};

/**
 * @summary Get Consumption Last Two Week
 */
export const getConsumptionLastTwoWeekKpisConsumptionWeeklyApartmentIdNumWeeksGet =
  (apartmentid: number, numweeks: number) => {
    return customInstance<ConsumptionLastTwoWeeksResponse[]>({
      url: `/kpis/consumption-weekly/${apartmentid}/${numweeks}`,
      method: "get",
    });
  };

export const getGetConsumptionLastTwoWeekKpisConsumptionWeeklyApartmentIdNumWeeksGetQueryKey =
  (apartmentid: number, numweeks: number) => [
    `/kpis/consumption-weekly/${apartmentid}/${numweeks}`,
  ];

export const useGetConsumptionLastTwoWeekKpisConsumptionWeeklyApartmentIdNumWeeksGet =
  <
    TData = AsyncReturnType<
      typeof getConsumptionLastTwoWeekKpisConsumptionWeeklyApartmentIdNumWeeksGet
    >,
    TError = HTTPValidationError
  >(
    apartmentid: number,
    numweeks: number,
    options?: {
      query?: UseQueryOptions<
        AsyncReturnType<
          typeof getConsumptionLastTwoWeekKpisConsumptionWeeklyApartmentIdNumWeeksGet
        >,
        TError,
        TData
      >;
    }
  ) => {
    const { query: queryOptions } = options || {};

    const queryKey =
      queryOptions?.queryKey ??
      getGetConsumptionLastTwoWeekKpisConsumptionWeeklyApartmentIdNumWeeksGetQueryKey(
        apartmentid,
        numweeks
      );

    const queryFn: QueryFunction<
      AsyncReturnType<
        typeof getConsumptionLastTwoWeekKpisConsumptionWeeklyApartmentIdNumWeeksGet
      >
    > = () =>
      getConsumptionLastTwoWeekKpisConsumptionWeeklyApartmentIdNumWeeksGet(
        apartmentid,
        numweeks
      );

    const query = useQuery<
      AsyncReturnType<
        typeof getConsumptionLastTwoWeekKpisConsumptionWeeklyApartmentIdNumWeeksGet
      >,
      TError,
      TData
    >(queryKey, queryFn, {
      enabled: !!(apartmentid && numweeks),
      ...queryOptions,
    });

    return {
      queryKey,
      ...query,
    };
  };