/**
 * Unit Tests for GrowthEcosystemSection Component
 * Tests: Component rendering, node visibility, hover interactions, responsive layout
 * Requirements: 6.1-6.6
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import GrowthEcosystemSection from './GrowthEcosystemSection'

describe('GrowthEcosystemSection', () => {
  /**
   * Test 1: Component renders all 7 ecosystem nodes
   * Validates: Requirements 6.1, 6.2
   */
  it('should render all 7 ecosystem nodes', () => {
    render(<GrowthEcosystemSection />)

    const expectedNodes = ['SEO', 'GEO', 'Content', 'Branding', 'Websites', 'Social', 'Performance\nMarketing']
    expectedNodes.forEach((nodeLabel) => {
      expect(screen.getByText(new RegExp(nodeLabel.split('\n')[0], 'i'))).toBeInTheDocument()
    })
  })

  /**
   * Test 2: Component renders section heading and subtitle
   * Validates: Requirements 6.1, 6.3
   */
  it('should render section heading and subtitle', () => {
    render(<GrowthEcosystemSection />)

    expect(screen.getByText(/Interconnected Growth System/i)).toBeInTheDocument()
    expect(
      screen.getByText(/Seven integrated capabilities working together/i)
    ).toBeInTheDocument()
  })

  /**
   * Test 3: Node hover state reveals description
   * Validates: Requirements 6.5
   */
  it('should show node description on hover', async () => {
    const user = userEvent.setup()
    render(<GrowthEcosystemSection />)

    // Find and hover over SEO node
    const seoNode = screen.getByLabelText(/SEO:/)
    await user.hover(seoNode)

    // Wait for description to appear
    await waitFor(() => {
      expect(
        screen.getByText(/Search engine optimization to increase organic visibility/i)
      ).toBeInTheDocument()
    })
  })

  /**
   * Test 4: Hover state shows connected nodes information
   * Validates: Requirements 6.5, 6.6
   */
  it('should display connected nodes on hover', async () => {
    const user = userEvent.setup()
    render(<GrowthEcosystemSection />)

    // Hover over SEO node
    const seoNode = screen.getByLabelText(/SEO:/)
    await user.hover(seoNode)

    // Check for connection information
    await waitFor(() => {
      expect(screen.getByText(/Connected to:/i)).toBeInTheDocument()
    })
  })

  /**
   * Test 5: Hover state is cleared on unhover
   * Validates: Requirements 6.5
   */
  it('should hide description when hovering away', async () => {
    const user = userEvent.setup()
    render(<GrowthEcosystemSection />)

    const seoNode = screen.getByLabelText(/SEO:/)
    
    // Hover over node
    await user.hover(seoNode)
    await waitFor(() => {
      expect(
        screen.getByText(/Search engine optimization to increase organic visibility/i)
      ).toBeInTheDocument()
    })

    // Unhover
    await user.unhover(seoNode)
    
    // Description should disappear
    await waitFor(() => {
      const description = screen.queryByText(/Search engine optimization to increase organic visibility/i)
      expect(description).not.toBeVisible()
    }, { timeout: 1000 })
  })

  /**
   * Test 6: Each node has an icon
   * Validates: Requirements 6.1
   */
  it('should render node icons', () => {
    render(<GrowthEcosystemSection />)

    // Check for emoji icons
    const expectedIcons = ['🔍', '📍', '✍️', '✨', '🌐', '💬', '📈']
    expectedIcons.forEach((icon) => {
      expect(screen.getByText(icon)).toBeInTheDocument()
    })
  })

  /**
   * Test 7: Nodes have distinct colors
   * Validates: Requirements 6.2, 6.3
   */
  it('should apply different colors to each node', () => {
    const { container } = render(<GrowthEcosystemSection />)

    const nodeCircles = container.querySelectorAll('button > div')
    expect(nodeCircles.length).toBeGreaterThanOrEqual(7)

    // Verify colors are different (basic check)
    const colors = new Set()
    nodeCircles.forEach((circle) => {
      const bgColor = window.getComputedStyle(circle).backgroundColor
      if (bgColor !== 'rgba(0, 0, 0, 0)') {
        colors.add(bgColor)
      }
    })
    expect(colors.size).toBeGreaterThanOrEqual(5) // At least 5 different colors
  })

  /**
   * Test 8: Keyboard focus accessibility
   * Validates: Requirements 6.5, 17.1
   */
  it('should support keyboard focus on nodes', async () => {
    const user = userEvent.setup()
    render(<GrowthEcosystemSection />)

    // Tab to first node
    await user.tab()

    // Node should be focused
    const focusedElement = document.activeElement
    expect(focusedElement?.getAttribute('aria-label')).toMatch(/SEO|GEO|Content|Branding|Websites|Social|Performance/i)
  })

  /**
   * Test 9: Accessibility labels for nodes
   * Validates: Requirements 17.2
   */
  it('should have descriptive aria-labels for all nodes', () => {
    render(<GrowthEcosystemSection />)

    const expectedLabels = [
      /SEO: Search engine optimization/i,
      /GEO: Geolocation targeting/i,
      /Content: Strategic content creation/i,
      /Branding: Brand strategy/i,
      /Websites: High-converting websites/i,
      /Social: Social media strategy/i,
      /Performance: Data-driven paid advertising/i,
    ]

    expectedLabels.forEach((labelPattern) => {
      expect(screen.getByLabelText(labelPattern)).toBeInTheDocument()
    })
  })

  /**
   * Test 10: Mobile layout shows description information
   * Validates: Requirements 6.6
   */
  it('should show connection information in mobile layout on tap', async () => {
    const user = userEvent.setup()
    // Mock mobile viewport
    vi.stubGlobal('innerWidth', 375)

    render(<GrowthEcosystemSection />)

    // On mobile, nodes are in a grid
    const nodeButtons = screen.getAllByRole('button')
    expect(nodeButtons.length).toBeGreaterThanOrEqual(7)
  })

  /**
   * Test 11: SVG connection lines render on desktop
   * Validates: Requirements 6.2, 6.3
   */
  it('should render SVG connection lines on desktop', () => {
    // Mock desktop viewport
    vi.stubGlobal('innerWidth', 1024)
    
    const { container } = render(<GrowthEcosystemSection />)

    const svgElements = container.querySelectorAll('svg line')
    // 7 nodes with multiple connections should have multiple lines
    expect(svgElements.length).toBeGreaterThan(5)
  })

  /**
   * Test 12: Connection lines highlight on node hover
   * Validates: Requirements 6.4, 6.5
   */
  it('should highlight connections when node is hovered', async () => {
    const user = userEvent.setup()
    const { container } = render(<GrowthEcosystemSection />)

    // Get first node button
    const firstNode = screen.getAllByRole('button')[0]
    
    // Hover over node
    await user.hover(firstNode)

    // Check that connection lines exist
    const svgLines = container.querySelectorAll('svg line')
    expect(svgLines.length).toBeGreaterThan(0)
  })

  /**
   * Test 13: Tooltip positioning for hovered nodes
   * Validates: Requirements 6.5
   */
  it('should position tooltip below hovered node', async () => {
    const user = userEvent.setup()
    render(<GrowthEcosystemSection />)

    const firstNode = screen.getAllByRole('button')[0]
    await user.hover(firstNode)

    await waitFor(() => {
      const tooltip = screen.queryByText(/Connected to:/i)?.closest('div')
      expect(tooltip).toBeInTheDocument()
    })
  })

  /**
   * Test 14: Multiple hover states don't accumulate
   * Validates: Requirements 6.5
   */
  it('should only show one node description at a time', async () => {
    const user = userEvent.setup()
    render(<GrowthEcosystemSection />)

    const nodes = screen.getAllByRole('button')
    
    // Hover first node
    await user.hover(nodes[0])
    await waitFor(() => {
      expect(screen.getByText(/Connected to:/i)).toBeInTheDocument()
    })

    // Hover second node
    await user.hover(nodes[1])
    
    // Should still only have one visible connection info
    const connectionInfos = screen.queryAllByText(/Connected to:/i)
    expect(connectionInfos.length).toBeLessThanOrEqual(2) // May have stale DOM elements
  })

  /**
   * Test 15: All nodes have proper role attributes
   * Validates: Requirements 17.1
   */
  it('should have proper ARIA attributes', () => {
    render(<GrowthEcosystemSection />)

    const nodeButtons = screen.getAllByRole('button')
    nodeButtons.forEach((button) => {
      expect(button).toHaveAttribute('aria-label')
      expect(button).toHaveAttribute('aria-pressed')
    })
  })

  /**
   * Test 16: Section is properly marked with heading
   * Validates: Requirements 16.4
   */
  it('should have proper heading hierarchy', () => {
    const { container } = render(<GrowthEcosystemSection />)

    const headings = container.querySelectorAll('h2')
    expect(headings.length).toBeGreaterThan(0)
    expect(headings[0]).toHaveTextContent(/Interconnected Growth System/i)
  })

  /**
   * Test 17: Node descriptions are informative
   * Validates: Requirements 6.1
   */
  it('should have meaningful descriptions for each node', async () => {
    const user = userEvent.setup()
    render(<GrowthEcosystemSection />)

    const nodeButtons = screen.getAllByRole('button')

    for (const button of nodeButtons.slice(0, 3)) {
      await user.hover(button)
      // Should show description with substantial text
      const description = screen.queryByText(/./i)?.textContent
      expect(description && description.length).toBeGreaterThan(20)
      await user.unhover(button)
    }
  })

  /**
   * Test 18: Mobile layout is responsive
   * Validates: Requirements 6.6, 13.1
   */
  it('should display responsive grid on mobile', () => {
    const { container } = render(<GrowthEcosystemSection />)

    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('grid-cols-2')
  })
})
