/**
 * Generated by orval v6.3.0 🍺
 * Do not edit manually.
 * Drop API
 * The OpenAPI schema for drop.energy
 * OpenAPI spec version: 0.1.0
 */

export type GetApartmentGroupsGetParams = {
  id?: number;
  id__operator?: unknown;
  apartment?: number;
  apartment__operator?: unknown;
  group_id?: number;
  group_id__operator?: unknown;
  __order?: string;
  __page_size?: number;
  __page?: number;
  __visible_fields?: string;
};