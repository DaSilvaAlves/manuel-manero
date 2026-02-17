/**
 * ActiveCampaign API Integration Service
 * Handles contact syncing and tagging to ActiveCampaign CRM
 */

interface ACContact {
  email: string
  firstName?: string
  lastName?: string
}

/**
 * Add or update a contact in ActiveCampaign
 * Gracefully handles API errors and missing credentials
 *
 * @param contact - Contact information (email, firstName, lastName)
 * @param tags - Array of tag names to assign to the contact
 * @returns true if successful, false if skipped or error
 */
export async function addContactToActiveCampaign(
  contact: ACContact,
  tags: string[] = []
): Promise<boolean> {
  const apiUrl = process.env.ACTIVECAMPAIGN_API_URL
  const apiKey = process.env.ACTIVECAMPAIGN_API_KEY

  // Skip if not configured
  if (!apiUrl || !apiKey || apiKey === 'placeholder' || apiKey === '') {
    console.warn('⚠️  ActiveCampaign not configured, skipping sync')
    return false
  }

  try {
    // Step 1: Upsert contact
    const contactResponse = await fetch(`${apiUrl}/api/3/contacts`, {
      method: 'POST',
      headers: {
        'Api-Token': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contact: {
          email: contact.email,
          firstName: contact.firstName,
          lastName: contact.lastName,
        },
      }),
    })

    if (!contactResponse.ok) {
      const error = await contactResponse.text()
      throw new Error(`Failed to upsert contact: ${contactResponse.status} - ${error}`)
    }

    const contactData = (await contactResponse.json()) as any
    const contactId = contactData?.contact?.id

    if (!contactId) {
      console.error('❌ No contact ID returned from ActiveCampaign')
      return false
    }

    // Step 2: Attach tags to contact (one API call per tag)
    if (tags.length > 0) {
      for (const tag of tags) {
        try {
          const tagResponse = await fetch(`${apiUrl}/api/3/contactTags`, {
            method: 'POST',
            headers: {
              'Api-Token': apiKey,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contactTag: {
                contact: contactId,
                tag: tag,
              },
            }),
          })

          if (!tagResponse.ok) {
            console.warn(`⚠️  Failed to attach tag "${tag}" to contact ${contactId}`)
          }
        } catch (error) {
          console.error(`❌ Error attaching tag "${tag}":`, error)
        }
      }
    }

    console.log(`✅ Contact synced to ActiveCampaign: ${contact.email}`)
    return true
  } catch (error) {
    console.error('❌ Error syncing to ActiveCampaign:', error)
    return false
  }
}
