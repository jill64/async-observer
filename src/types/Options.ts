export type Options = {
  /**
   * Time in ms to wait before setting the status to IDLE after a promise is resolved
   * @default 5000
   */
  resolveToIdle?: number
  /**
   * Time in ms to wait before setting the status to IDLE after a promise is rejected
   * @default 5000
   */
  rejectToIdle?: number
}
