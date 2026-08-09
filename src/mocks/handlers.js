import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/generate-itinerary', async ({ request }) => {
    const data = await request.json();
    
    // Simulating a backend delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return HttpResponse.json({
      success: true,
      data: {
        destination: data.destination || "Colombo",
        dates: data.dates || "Aug 11 - Aug 17",
        budgetUsed: "65%",
        itinerary: [
          {
            day: 1,
            title: "Arrival & Exploration",
            activities: [
              { time: "10:00 AM", title: "Arrival", desc: "Private VIP transfer from the airport." },
              { time: "02:00 PM", title: "Check-in", desc: "Settle into your luxury suite." },
              { time: "06:30 PM", title: "Welcome Dinner", desc: "Exclusive dining experience with local friends." }
            ]
          }
        ]
      }
    });
  }),
];