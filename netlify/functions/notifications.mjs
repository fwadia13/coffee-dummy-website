const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

export default async (request) => {
  if (request.method !== 'POST') {
    return Response.json({ success: false, message: 'Method not allowed.' }, {
      status: 405,
      headers: { Allow: 'POST' }
    });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error('WEB3FORMS_ACCESS_KEY is not configured for this Netlify Function.');
    return Response.json({ success: false, message: 'Notifications are not configured.' }, { status: 500 });
  }

  try {
    const payload = await request.json();
    if (!payload || typeof payload !== 'object') {
      return Response.json({ success: false, message: 'Invalid request.' }, { status: 400 });
    }

    // Set the key last so a browser request can never override it.
    const web3formsResponse = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...payload, access_key: accessKey })
    });
    const result = await web3formsResponse.json();

    if (!web3formsResponse.ok || !result.success) {
      console.error('Web3Forms rejected notification:', result);
      return Response.json({ success: false, message: 'Unable to send notification.' }, { status: 502 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Notification function failed:', error);
    return Response.json({ success: false, message: 'Unable to send notification.' }, { status: 500 });
  }
};

export const config = { path: '/api/notifications' };
