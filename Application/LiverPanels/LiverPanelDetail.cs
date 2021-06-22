using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.LiverPanels
{
    public class LiverPanelDetail
    {
        public class Query : IRequest<LiverPanel>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, LiverPanel>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<LiverPanel> Handle(Query request, CancellationToken cancellationToken)
            {
                    return await _context.LiverPanels.FindAsync(request.Id);

            }
        }
    }
}