/**
 * Generated by orval v6.3.0 🍺
 * Do not edit manually.
 * Drop API
 * The OpenAPI schema for drop.energy
 * OpenAPI spec version: 0.1.0
 */

export type GetMeasurementGetParams = {
  id?: number;
  id__operator?: unknown;
  timestamp?: string;
  appliance?: string;
  apartment?: number;
  apartment__operator?: unknown;
  power_consumption?: number;
  water_consumption?: number;
  temp?: number;
  flow_time?: number;
  __order?: string;
  __page_size?: number;
  __page?: number;
  __visible_fields?: string;
};