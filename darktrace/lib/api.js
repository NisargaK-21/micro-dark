
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Fetch overview statistics
 * @returns {Promise<Object>} Overview stats object
 */
export async function fetchOverviewStats() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/overview`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Failed to fetch overview stats:', error);
    throw error;
  }
}

/**
 * Fetch vendor activity data
 * @param {Object} params - Query parameters
 * @param {string} params.risk_level - Filter by risk level (Critical, High, Medium, Low)
 * @param {number} params.limit - Number of results to return
 * @param {number} params.offset - Pagination offset
 * @returns {Promise<Array>} Array of vendor objects
 */
export async function fetchVendors(params = {}) {
  try {
    const query = new URLSearchParams(params);
    const res = await fetch(`${API_BASE_URL}/api/vendors?${query}`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Failed to fetch vendors:', error);
    throw error;
  }
}

/**
 * Fetch dashboard statistics
 * @returns {Promise<Object>} Dashboard stats
 */
export async function fetchDashboardStats() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/dashboard/stats`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    throw error;
  }
}

/**
 * Fetch campaign trends data for charts
 * @param {number} days - Number of days to fetch (default: 7)
 * @returns {Promise<Object>} Chart data object with labels and datasets
 */
export async function fetchDashboardTrends(days = 7) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/dashboard/trends?days=${days}`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Failed to fetch dashboard trends:', error);
    throw error;
  }
}

/**
 * Fetch tactic distribution data
 * @returns {Promise<Object>} Chart data for tactic distribution
 */
export async function fetchTacticDistribution() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/dashboard/tactics`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Failed to fetch tactic distribution:', error);
    throw error;
  }
}

/**
 * Fetch recent activity feed
 * @param {number} limit - Number of activities to return (default: 10)
 * @returns {Promise<Array>} Array of activity objects
 */
export async function fetchRecentActivity(limit = 10) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/dashboard/activity?limit=${limit}`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Failed to fetch recent activity:', error);
    throw error;
  }
}

/**
 * Fetch campaign network graph data
 * @returns {Promise<Object>} Graph data with nodes and edges
 */
export async function fetchCampaignGraph() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/campaigns`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Failed to fetch campaign graph:', error);
    throw error;
  }
}

/**
 * Fetch detailed vendor information
 * @param {string} vendorId - Vendor ID
 * @returns {Promise<Object>} Detailed vendor object
 */
export async function fetchVendorDetails(vendorId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/vendors/${vendorId}`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Failed to fetch vendor details:', error);
    throw error;
  }
}

/**
 * Fetch detailed campaign information
 * @param {string} campaignId - Campaign ID
 * @returns {Promise<Object>} Detailed campaign object
 */
export async function fetchCampaignDetails(campaignId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/campaigns/${campaignId}`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Failed to fetch campaign details:', error);
    throw error;
  }
}

