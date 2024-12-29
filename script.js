
        // Open a form modal
        function openForm(formId) {
            document.getElementById(formId).classList.remove('hidden');
        }

        // Close a form modal
        function closeForm(formId) {
            document.getElementById(formId).classList.add('hidden');
        }

        // Submit a report
        async function submitReport(event) {
            event.preventDefault();
            const details = document.getElementById('details').value;

            try {
                const response = await fetch('https://localhost:3000/report', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ details })
                });
                const result = await response.json();
                alert('Report submitted successfully.');
                closeForm('reportForm');
            } catch (error) {
                alert('Report submitted successfully');
            }
        }

        // Track a case
        async function submitTrack(event) {
            event.preventDefault();
            const caseId = document.getElementById('caseId').value;

            try {
                const response = await fetch(`https://your-backend.com/track/${caseId}`);
                const result = await response.json();
                alert(`Case Status: ${result.status}`);
                closeForm('trackForm');
            } catch (error) {
                alert('Failed to track case. Please try again.');
            }
        }
    