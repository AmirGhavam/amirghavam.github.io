        // Notes Data - Update this with your actual notes
        const notesData = [
            {
                id: 1,
                title: "Python Data Structures Cheat Sheet",
                description: "Comprehensive guide to lists, dictionaries, sets, and tuples with practical examples and time complexities.",
                category: "cs",
                difficulty: "beginner",
                date: "2024-11-20",
                githubLink: "https://github.com/AmirGhavam/notes/blob/main/python-data-structures.md",
                downloadLink: "/files/python-data-structures.pdf"
            },
            {
                id: 2,
                title: "Machine Learning Algorithms Summary",
                description: "Quick reference for supervised, unsupervised, and reinforcement learning algorithms with use cases.",
                category: "datascience",
                difficulty: "intermediate",
                date: "2024-11-18",
                githubLink: "https://github.com/AmirGhavam/notes/blob/main/ml-algorithms.md",
                downloadLink: "/files/ml-algorithms.pdf"
            },
            {
                id: 3,
                title: "Linear Algebra for ML",
                description: "Essential linear algebra concepts including matrices, vectors, eigenvalues, and decompositions.",
                category: "math",
                difficulty: "advanced",
                date: "2024-11-15",
                githubLink: "https://github.com/AmirGhavam/notes/blob/main/linear-algebra-ml.md",
                downloadLink: "/files/linear-algebra-ml.pdf"
            },
            {
                id: 4,
                title: "Database Design Principles",
                description: "SQL fundamentals, normalization, indexing, and optimization techniques for efficient database design.",
                category: "cs",
                difficulty: "intermediate",
                date: "2024-11-12",
                githubLink: "https://github.com/AmirGhavam/notes/blob/main/database-design.md",
                downloadLink: "/files/database-design.pdf"
            },
            {
                id: 5,
                title: "Sudoku Problem Patterns",
                description: "Original sudoku puzzle patterns, solving techniques, and custom difficulty classifications.",
                category: "math",
                difficulty: "beginner",
                date: "2024-11-10",
                githubLink: "https://github.com/AmirGhavam/notes/blob/main/sudoku-patterns.md",
                downloadLink: "/files/sudoku-patterns.pdf"
            },
            {
                id: 6,
                title: "Cognitive Psychology Notes",
                description: "Key concepts in memory, attention, perception, and learning from modern cognitive psychology research.",
                category: "psychology",
                difficulty: "intermediate",
                date: "2024-11-08",
                githubLink: "https://github.com/AmirGhavam/notes/blob/main/cognitive-psychology.md",
                downloadLink: "/files/cognitive-psychology.pdf"
            },
            {
                id: 7,
                title: "Time Series Analysis",
                description: "ARIMA, exponential smoothing, forecasting methods, and evaluation metrics for time series data.",
                category: "datascience",
                difficulty: "advanced",
                date: "2024-11-05",
                githubLink: "https://github.com/AmirGhavam/notes/blob/main/time-series-analysis.md",
                downloadLink: "/files/time-series-analysis.pdf"
            },
            {
                id: 8,
                title: "Web Development Best Practices",
                description: "Frontend optimization, responsive design, accessibility, security, and performance best practices.",
                category: "cs",
                difficulty: "intermediate",
                date: "2024-11-03",
                githubLink: "https://github.com/AmirGhavam/notes/blob/main/web-best-practices.md",
                downloadLink: "/files/web-best-practices.pdf"
            },
            {
                id: 9,
                title: "Health & Nutrition Guide",
                description: "Evidence-based nutrition principles, macronutrients, micronutrients, and fitness basics.",
                category: "health",
                difficulty: "beginner",
                date: "2024-11-01",
                githubLink: "https://github.com/AmirGhavam/notes/blob/main/health-nutrition.md",
                downloadLink: "/files/health-nutrition.pdf"
            },
            {
                id: 10,
                title: "English Writing Essentials",
                description: "Grammar rules, writing styles, common mistakes, and tips for clear and effective communication.",
                category: "english",
                difficulty: "beginner",
                date: "2024-10-30",
                githubLink: "https://github.com/AmirGhavam/notes/blob/main/english-writing.md",
                downloadLink: "/files/english-writing.pdf"
            }
        ];

        let currentFilter = 'all';
        let currentSearch = '';

        function renderNotes(notes) {
            const grid = document.getElementById('notesGrid');
            const emptyState = document.getElementById('emptyState');

            if (notes.length === 0) {
                grid.innerHTML = '';
                emptyState.style.display = 'block';
                return;
            }

            emptyState.style.display = 'none';
            grid.innerHTML = notes.map(note => `
                <div class="note-card">
                    <div class="note-header">
                        <span class="note-category">${getCategoryLabel(note.category)}</span>
                        <h3 class="note-title">${note.title}</h3>
                    </div>
                    <div class="note-actions">
                        <a href="${note.githubLink}" target="_blank" class="note-btn">
                            <span>GitHub</span>
                            <span>→</span>
                        </a>
                        <button class="note-btn primary" onclick="downloadNote('${note.title}')">
                            <span>Download PDF</span>
                        </button>
                    </div>
                </div>
            `).join('');
        }


                    // <div class="note-header">
                    //     <span class="note-category">${getCategoryLabel(note.category)}</span>
                    //     <h3 class="note-title">${note.title}</h3>
                    //     // <p class="note-description">${note.description}</p>
                    // </div>
                    // <div class="note-meta">
                    //     // <span class="note-date">📅 ${formatDate(note.date)}</span>
                    //      <span class="note-difficulty difficulty-${note.difficulty}">${capitalizeFirst(note.difficulty)}</span>
                    // </div>




        function filterNotes(category) {
            currentFilter = category;
            updateFilterButtons();
            applyFiltersAndSearch();
        }

        function searchNotes() {
            currentSearch = document.getElementById('searchInput').value.toLowerCase();
            applyFiltersAndSearch();
        }

        function applyFiltersAndSearch() {
            let filtered = notesData;

            // Apply category filter
            if (currentFilter !== 'all') {
                filtered = filtered.filter(note => note.category === currentFilter);
            }

            // Apply search filter
            if (currentSearch) {
                filtered = filtered.filter(note =>
                    note.title.toLowerCase().includes(currentSearch) ||
                    note.description.toLowerCase().includes(currentSearch)
                );
            }

            renderNotes(filtered);
        }

        function updateFilterButtons() {
            document.querySelectorAll('.filter-btn').forEach((btn, index) => {
                const categories = ['all', 'cs', 'datascience', 'math', 'psychology', 'health', 'english'];
                btn.classList.toggle('active', categories[index] === currentFilter);
            });
        }

        function downloadNote(title) {
            showToast(`Downloading "${title}"... 📥`);
            // In a real implementation, you would trigger the actual download here
            // For now, this just shows a notification
        }

        function getCategoryLabel(category) {
            const labels = {
                'cs': 'Computer Science',
                'datascience': 'Data Science',
                'math': 'Mathematics',
                'psychology': 'Psychology',
                'health': 'Health',
                'english': 'English'
            };
            return labels[category] || category;
        }

        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        }

        function capitalizeFirst(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        function toggleMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('active');
        }

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('navLinks').classList.remove('active');
            });
        });

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', () => {
            renderNotes(notesData);
        });
